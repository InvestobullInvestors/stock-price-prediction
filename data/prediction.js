const { realtimeStockInfo } = require('../dal/stock-markets');
const { predictedStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');
const axios = require('axios');
const tickerToEndpointMap = {
    AAPL: 'http://4e90c0c4-c301-4dd5-b3a1-7279b5a399ad.canadacentral.azurecontainer.io/score',
    TWTR: 'http://030da4c9-88d8-4549-9689-727fbcbdb424.canadacentral.azurecontainer.io/score',
    TXN: '',
    FB: 'http://73ac4a9e-bcc3-4632-a7b6-c224dab0d02f.canadacentral.azurecontainer.io/score',
    GOOGL: 'http://bad8e482-005d-4788-9cb6-b96735b8e987.canadacentral.azurecontainer.io/score',
    AMZN: '',
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

const predictPrices = async () => {
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
};

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
        if (currentDay == 5) {
            // saturday
            addDays = 2;
        } else if (currentDay == 6) {
            // sunday
            addDays = 1;
        }

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

predictPrices().then((_) => {
    console.log('completed execution');
});
