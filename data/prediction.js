const { realtimeStockInfo } = require('../dal/stock-markets');
const { predictedStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');
const axios = require('axios');
const esprima = require('esprima');

const tickerToEndpointMap = {
    AAPL: 'http://f6b1b502-ac55-4522-b0ef-f4becf1604a2.canadacentral.azurecontainer.io/score',
    TWTR: '',
    TXN: '',
    FB: '',
    GOOGL: '',
    AMZN: '',
    COST: '',
};

const number_of_days = [2, 3, 6];

const predictPrices = async () => {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            console.log(`Processing data for ${stock_data.ticker}`);
            const stockPredictionInfo = await predictedStockInfo.findOne({
                ticker_id: stock_data.ticker,
            });

            get_dependent_variables(stock_data.ticker)
                .then(async (dependent_variable_list) => {
                    console.log(
                        'dependent_variable_list: ',
                        dependent_variable_list
                    );
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

const get_dependent_variables = async (ticker) => {
    const {
        stock_details: { timestamp, volume, open, high, low },
    } = await realtimeStockInfo.findOne({ ticker_id: ticker });
    console.log(timestamp, volume, open, high, low);

    const res = [];

    for (let days of number_of_days) {
        const date = new Date(timestamp);
        const new_date = new Date(date.setDate(date.getDate() + days));
        const new_time = new Date(new_date.setUTCHours(0));

        const randomInt = Math.floor(Math.random() * 5) + 1;
        const randomPercent = 0.05 * randomInt;
        console.log('RandomInt: ', randomInt);
        const new_volume = volume + volume * randomPercent;
        const new_open = open + open * randomPercent;
        const new_high = high + high * randomPercent;
        const new_low = low + low * randomPercent;

        console.log('OPEN: ', new_open);

        res.push({
            Date: new_time,
            Volume: new_volume * 1000,
            Open: roundToTwoDecimals(new_open),
            High: roundToTwoDecimals(new_high),
            Low: roundToTwoDecimals(new_low),
        });
    }

    const scoreList = getPredictionScoreFromAPI(res, ticker);

    return res;
};

// Returns a list of prediction scores from Azure AutoML endpoint
const getPredictionScoreFromAPI = async (dependentVariableList, ticker) => {
    let scoreURI = '';
    for (const [key, value] of Object.entries(tickerToEndpointMap)) {
        if (ticker === key) scoreURI = value;
    }

    const data = {
        data: dependentVariableList,
    };

    let scoreList = [];
    if (scoreURI !== '') {
        const scoreRes = await axios.post(scoreURI, JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
        const scoreObj = JSON.parse(scoreRes.data);
        console.log(scoreObj);
        scoreList = scoreObj['forecast'];
    } else {
        console.log('Score URI is an empty string');
    }
    return scoreList;
};

const roundToTwoDecimals = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
};

predictPrices().then((_) => {
    console.log('completed execution');
});
