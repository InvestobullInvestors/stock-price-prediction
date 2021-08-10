const express = require('express');
const { stockMarketInfo, realtimeStockInfo } = require('../dal/stock-markets');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const NewsAPI = require('newsapi');
const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);

const axios = require('axios');
const { dailyGraphInfo } = require('../dal/stock-markets');
const { stockNewsInfo } = require('../dal/stock-markets');
const { quarterlyStockInfo } = require('../dal/stock-markets');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const { newsSourceInfo, stockNewsList } = require('../dal/stock-markets');

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
    await newsapi.v2.topHeadlines({
        q: `${name}`,
        language: 'en',
    });

const getMarketNewsFromApi = async (id) =>
    await newsapi.v2.topHeadlines({
        sources: `${id}`,
        language: 'en',
    });

const getQuarterlyStockDataFromApi = async ({ ticker }) => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${stockDataApiKey}`;
    const { data } = await axios.get(url);
    return data;
};

const getStockDataFromApi = async ({ ticker }) => {
    const maxTries = 3;
    for (let i = 1; i <= maxTries; i++) {
        console.log(`Trying to get data for ${ticker} for the ${i}th time`);
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${stockDataApiKey}`;
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
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${stockDataApiKey}`;
    const { data } = await axios.get(url);
    return data;
};

module.exports = router;
