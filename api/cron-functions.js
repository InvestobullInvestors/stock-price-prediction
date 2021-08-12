const express = require('express');
const {
    dailyGraphInfo,
    newsSourceInfo,
    predictedStockInfo,
    quarterlyStockInfo,
    realtimeStockInfo,
    stockMarketInfo,
    stockNewsInfo,
    stockNewsList,
} = require('../dal/stock-markets');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const NewsAPI = require('newsapi');
const STOCK_DATA_API_KEY = new NewsAPI(process.env.STOCK_DATA_API_KEY);
const NEWS_API = new NewsAPI(process.env.NEWS_API_KEY);

const axios = require('axios');

const {} = require('../dal/stock-markets');
const tickerToEndpointMap = {
    AAPL: 'http://4e90c0c4-c301-4dd5-b3a1-7279b5a399ad.canadacentral.azurecontainer.io/score',
    TWTR: 'http://030da4c9-88d8-4549-9689-727fbcbdb424.canadacentral.azurecontainer.io/score',
    TXN: '',
    FB: 'http://73ac4a9e-bcc3-4632-a7b6-c224dab0d02f.canadacentral.azurecontainer.io/score',
    GOOGL: 'http://bad8e482-005d-4788-9cb6-b96735b8e987.canadacentral.azurecontainer.io/score',
    AMZN: 'http://0bf1305e-fef7-470c-b1e7-4f6fc05e61a5.canadacentral.azurecontainer.io/score',
    COST: '',
    QCOM: '',
    AVGO: '',
    CSCO: 'http://3510bfec-9fa1-42da-aa53-d372c39196b5.centralus.azurecontainer.io/score',
    TSLA: 'http://fa5c9b45-ce62-4fd2-ada6-7577da961d40.centralus.azurecontainer.io/score',
    INTC: 'http://b7b2e1de-8f11-4608-8f0c-706ce1eff94c.centralus.azurecontainer.io/score',
    CMCSA: 'http://22bf09cc-c6c5-4140-961f-ceb313f36d95.canadacentral.azurecontainer.io/score',
    NFLX: 'http://ca1e5525-9831-4300-9b8f-09a4728d81fe.canadacentral.azurecontainer.io/score',
    PEP: 'http://bd11a1d3-ecea-40c4-8f8c-efda1333a980.canadacentral.azurecontainer.io/score',
    ADBE: 'http://15d1cdd8-a814-4b62-90ee-de15fc6d6225.eastus2.azurecontainer.io/score',
    MSFT: 'http://08478e4a-bbc7-4e7b-bb07-38f4792fea4b.eastus2.azurecontainer.io/score',
    PYPL: 'http://52461b64-760e-4e2a-8012-3c1f6cce213e.canadacentral.azurecontainer.io/score',
    NVDA: 'http://f3459155-fdfd-4328-a00c-5a58dcfef578.canadacentral.azurecontainer.io/score',
};

const numOfDays = [1, 3, 6];

router.get('/cron-functions/getPredictions', async function (req, res) {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            console.log(`Processing data for ${stock_data.ticker}`);
            const stockPredictionInfo = await predictedStockInfo.findOne({
                ticker_id: stock_data.ticker,
            });

            getDependentVariables(stock_data.ticker)
                .then(async (dependent_variable_list) => {
                    if (stockPredictionInfo) {
                        await predictedStockInfo.updateOne(
                            { ticker_id: stock_data.ticker },
                            {
                                stock_name: stock_data.name,
                                stock_id: stock_data._id,
                                prediction_details: dependent_variable_list,
                            }
                        );

                        console.log('Update successful');
                    } else {
                        const stockPredictionData = new predictedStockInfo({
                            market_name: market_data.market_name,
                            market_id: market_data._id,
                            stock_name: stock_data.name,
                            ticker_id: stock_data.ticker,
                            stock_id: stock_data._id,
                            prediction_details: dependent_variable_list,
                        });

                        await stockPredictionData.save();
                        console.log('Save successful');
                    }
                })
                .catch(({ message }) => {
                    console.log(message);
                });
        }
    }
    res.send('Successfully retrieved prediction prices');
});

// get Date, Volume, Open, High, Low, values from database and fluctuate their values
const getDependentVariables = async (ticker) => {
    const {
        stock_details: { timestamp, volume, open, high, low },
    } = await realtimeStockInfo.findOne({ ticker_id: ticker });

    const res = [];

    for (let days of numOfDays) {
        const date = new Date(timestamp);
        let newDate = new Date(date.setDate(date.getDate() + days));
        let currentDay = newDate.getDay();
        let addDays = 0;

        // if date is weekend, set date to Monday since no predictions available for weekends
        if (currentDay === 5) addDays = 2;
        else if (currentDay === 6) addDays = 1;

        newDate.setDate(newDate.getDate() + addDays);
        const newDateWithTime = new Date(newDate.setUTCHours(0));

        // randomize dependent variables
        const randomPercent = (Math.random() * 5 + 1) * 0.01;
        const new_volume = volume + volume * randomPercent;
        const new_open = open + open * randomPercent;
        const new_high = high + high * randomPercent;
        const new_low = low + low * randomPercent;

        res.push({
            Date: newDateWithTime,
            Volume: Math.round(new_volume),
            Open: roundToTwoDecimals(new_open),
            High: roundToTwoDecimals(new_high),
            Low: roundToTwoDecimals(new_low),
        });
    }

    return getPredictionScoreFromAPI(res, ticker);
};

// Returns a list of updated prediction_details with prediction scores from Azure AutoML endpoint
const getPredictionScoreFromAPI = async (dependentVariableList, ticker) => {
    let scoreURI = tickerToEndpointMap[ticker];

    const data = {
        data: dependentVariableList,
    };

    if (scoreURI !== '') {
        let scoreRes = await axios.post(scoreURI, JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
        let score = scoreRes.data.replace('NaN', 0.0); // having NaN in JSON throws error
        const scoreObj = JSON.parse(score);
        const scoreList = scoreObj['forecast'];
        let count = 0;
        dependentVariableList.forEach(function (element) {
            if (isNaN(scoreList[count])) {
                element.Close = 0.0;
            } else {
                element.Close = roundToTwoDecimals(scoreList[count]);
            }
            count += 1;
        });
    } else {
        console.log('Score URI is an empty string');
    }

    return [...dependentVariableList];
};

// Rounds input to two decimal places
const roundToTwoDecimals = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
};

router.get('/cron-functions/getRealtimeStockData', async function (req, res) {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        const stocks_considered = market_data.stocks.slice(0, 5);
        console.log(stocks_considered);
        for (let stock_data of stocks_considered) {
            console.log(`Processing data for ${stock_data.ticker}`);
            const realTimeStockInfo = await realtimeStockInfo.findOne({
                ticker_id: stock_data.ticker,
            });
            const stockDataFromApi = await getStockDataFromApi(stock_data);
            const intraDayData = stockDataFromApi['Time Series (Daily)'];
            const latest_timestamp = Object.keys(intraDayData)[0];
            const data = intraDayData[latest_timestamp];
            const stock_details = {
                timestamp: latest_timestamp,
                open: data['1. open'],
                high: data['2. high'],
                low: data['3. low'],
                close: data['4. close'],
                volume: data['5. volume'],
            };

            if (realTimeStockInfo) {
                await realtimeStockInfo.updateOne(
                    { ticker_id: stock_data.ticker },
                    {
                        stock_id: stock_data._id,
                        stock_details: stock_details,
                    }
                );
                console.log('Update successful');
            } else {
                const realTimeStockData = new realtimeStockInfo({
                    market_name: market_data.market_name,
                    market_id: market_data._id,
                    stock_name: stock_data.name,
                    ticker_id: stock_data.ticker,
                    stock_id: stock_data._id,
                    stock_details: stock_details,
                });
                await realTimeStockData.save();
                console.log('Save successful');
            }
        }
    }
    res.send('Successfully processed realtime data for all stocks');
});

router.get('/cron-functions/getQuarterlyStockData', async function (req, res) {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        const stocks_considered = market_data.stocks.slice(0, 5);
        console.log(stocks_considered);
        for (let stock_data of stocks_considered) {
            console.log(`Processing data for ${stock_data.ticker}`);
            const quarterlyStockInfoForTicker =
                await quarterlyStockInfo.findOne({
                    ticker_id: stock_data.ticker,
                });
            const stockDataFromApi = await getQuarterlyStockDataFromApi(
                stock_data
            );
            const quarterly_stock_details = {
                industry: stockDataFromApi['Industry'],
                currency: stockDataFromApi['Currency'],
                pe_ratio: Number(stockDataFromApi['PERatio']) || null,
                peg_ratio: Number(stockDataFromApi['PEGRatio']) || null,
                eps: Number(stockDataFromApi['EPS']) || null,
                quarterly_earning_growth:
                    Number(stockDataFromApi['QuarterlyEarningsGrowthYOY']) ||
                    null,
                quarterly_revenue_growth:
                    Number(stockDataFromApi['QuarterlyRevenueGrowthYOY']) ||
                    null,
                beta: Number(stockDataFromApi['Beta']) || null,
                fifty_two_week_high:
                    Number(stockDataFromApi['52WeekHigh']) || null,
                fifty_two_week_low:
                    Number(stockDataFromApi['52WeekLow']) || null,
                dividend_payout_ratio:
                    Number(stockDataFromApi['PayoutRatio']) || null,
                dividend_date: stockDataFromApi['DividendDate'],
                shares_outstanding:
                    Number(stockDataFromApi['SharesOutstanding']) || null,
                shares_float: Number(stockDataFromApi['SharesFloat']) || null,
                shares_short: Number(stockDataFromApi['SharesShort']) || null,
            };

            if (quarterlyStockInfoForTicker) {
                await quarterlyStockInfo.updateOne(
                    { ticker_id: stock_data.ticker },
                    {
                        stock_id: stock_data._id,
                        stock_details: quarterly_stock_details,
                    }
                );
                console.log('Update successful');
            } else {
                const quarterlyStockData = new quarterlyStockInfo({
                    market_name: market_data.market_name,
                    market_id: market_data._id,
                    stock_name: stock_data.name,
                    ticker_id: stock_data.ticker,
                    stock_id: stock_data._id,
                    stock_details: quarterly_stock_details,
                });
                await quarterlyStockData.save();
                console.log('Save successful');
            }
        }
    }
    res.send('Successfully processed quarterly data for all stocks');
});

router.get('/cron-functions/getStockNews', async function (req, res) {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            const result = await stockNewsInfo.findOne({
                ticker_id: stock_data.ticker,
            });
            const { articles } = await getStockNewsFromApi(stock_data);
            if (result) {
                const { stock_news } = result;
                const filteredArticles = articles.filter((article) => {
                    return !newsArticleExists(stock_news, article);
                });
                await stockNewsInfo.updateOne(
                    { ticker_id: stock_data.ticker },
                    {
                        stock_id: stock_data._id,
                        stock_news: [...filteredArticles, ...stock_news],
                    }
                );
                console.log(
                    `Successfully updated news for stock: ${stock_data.name}`
                );
            } else {
                const stockNewsData = new stockNewsInfo({
                    market_name: market_data.market_name,
                    market_id: market_data._id,
                    stock_name: stock_data.name,
                    ticker_id: stock_data.ticker,
                    stock_id: stock_data._id,
                    stock_news: articles,
                });
                await stockNewsData.save();
                console.log(
                    `Successfully added news for stock: ${stock_data.name}`
                );
            }
        }
    }
    res.send('Successfully processed news data for all stocks');
});

router.get(
    '/cron-functions/getDailyStockPriceGraphData',
    async function (req, res) {
        const doc = await stockMarketInfo.find({});
        for (let market_data of doc) {
            const stocks_considered = market_data.stocks.slice(0, 5);
            console.log(stocks_considered);
            for (let stock_data of stocks_considered) {
                console.log(`Processing data for ${stock_data.ticker}`);
                const dailyGraphData = await dailyGraphInfo.findOne({
                    ticker_id: stock_data.ticker,
                });

                const dailyStockDataFromApi =
                    await getDailyStockPriceGraphDataFromApi(stock_data);
                const timeSeriesData =
                    dailyStockDataFromApi['Time Series (Daily)'];

                const timestamps = Object.keys(timeSeriesData);
                const stock_details = [];
                timestamps.forEach((timestamp) => {
                    const timeStampData = timeSeriesData[timestamp];
                    stock_details.push({
                        timestamp: timestamp,
                        open: timeStampData['1. open'],
                        high: timeStampData['2. high'],
                        low: timeStampData['3. low'],
                        close: timeStampData['4. close'],
                        volume: timeStampData['5. volume'],
                    });
                });

                if (dailyGraphData) {
                    await dailyGraphInfo.updateOne(
                        { ticker_id: stock_data.ticker },
                        {
                            stock_id: stock_data._id,
                            stock_details: stock_details,
                        }
                    );
                    console.log('Update successful');
                } else {
                    const dailyStockData = new dailyGraphInfo({
                        market_name: market_data.market_name,
                        market_id: market_data._id,
                        stock_name: stock_data.name,
                        ticker_id: stock_data.ticker,
                        stock_id: stock_data._id,
                        stock_details: stock_details,
                    });
                    await dailyStockData.save();
                    console.log('Save successful');
                }
            }
        }
        res.send('Successfully got daily price data for stocks');
    }
);

router.get('/cron-functions/getMarketNews', async function (req, res) {
    const stockNewsInfo = await stockNewsList.find({});
    for (const { news_sources } of stockNewsInfo) {
        for (const { id, name } of news_sources) {
            console.log(`Getting data from news source: ${name}`);
            const { articles } = await getMarketNewsFromApi(id);

            newsSourceInfo.find({ source: name }).then((doc) => {
                if (doc.length === 0) {
                    const newsInfo = new newsSourceInfo({
                        source: name,
                        stock_news: articles,
                    });
                    newsInfo.save().then(() => {
                        console.log('Save successful');
                    });
                } else {
                    newsSourceInfo
                        .updateOne(
                            { source: name },
                            {
                                stock_news: articles,
                            }
                        )
                        .then(() => {
                            console.log('Update successful');
                        });
                }
            });
            console.log(`Successfully got data from news source: ${name}`);
        }
    }
    res.send('Successfully processed market news for all news sources');
});

const newsArticleExists = (stock_news, article) =>
    stock_news.find((news) => news['publishedAt'] === article.publishedAt);

const getStockNewsFromApi = async ({ name }) =>
    await NEWS_API.v2.topHeadlines({
        q: `${name}`,
        language: 'en',
    });

const getMarketNewsFromApi = async (id) =>
    await NEWS_API.v2.topHeadlines({
        sources: `${id}`,
        language: 'en',
    });

const getQuarterlyStockDataFromApi = async ({ ticker }) => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${STOCK_DATA_API_KEY}`;
    const { data } = await axios.get(url);
    return data;
};

const getStockDataFromApi = async ({ ticker }) => {
    const maxTries = 3;
    for (let i = 1; i <= maxTries; i++) {
        console.log(`Trying to get data for ${ticker} for the ${i}th time`);
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${STOCK_DATA_API_KEY}`;
        const { data } = await axios.get(url);
        if (data['Time Series (Daily)']) {
            return data;
        } else {
            console.log(
                `Errored out for ticker=${ticker}. Data received=`,
                data
            );
            await new Promise((resolve) => setTimeout(resolve, 40000));
        }
    }
};

const getDailyStockPriceGraphDataFromApi = async ({ ticker }) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${STOCK_DATA_API_KEY}`;
    const { data } = await axios.get(url);
    return data;
};

module.exports = router;
