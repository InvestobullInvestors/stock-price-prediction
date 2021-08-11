const { realtimeStockInfo } = require('../dal/stock-markets');
const { predictedStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');
const axios = require('axios');
const tickerToEndpointMap = {
    AAPL: 'http://f6b1b502-ac55-4522-b0ef-f4becf1604a2.canadacentral.azurecontainer.io/score',
    TWTR: '',
    TXN: '',
    FB: '',
    GOOGL: '',
    AMZN: '',
    COST: '',
    QCOM: '',
    AVGO: '',
    CSCO: '',
    TSLA: '',
    INTC: '',
    CMCSA: '',
    NFLX: '',
    UBER: '',
    PEP: '',
    ADBE: 'http://15d1cdd8-a814-4b62-90ee-de15fc6d6225.eastus2.azurecontainer.io/score',
    MSFT: 'http://08478e4a-bbc7-4e7b-bb07-38f4792fea4b.eastus2.azurecontainer.io/score',
    PYPL: '',
    NVDA: '',
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
    let scoreURI = '';
    for (const [key, value] of Object.entries(tickerToEndpointMap)) {
        if (ticker === key) scoreURI = value;
    }

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
    const newList = [...dependentVariableList]; // create new list of prediction_details to return
    return newList;
};

// Rounds input to two decimal places
const roundToTwoDecimals = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
};

predictPrices().then((_) => {
    console.log('completed execution');
});
