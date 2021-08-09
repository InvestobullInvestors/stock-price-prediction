const { realtimeStockInfo } = require('../dal/stock-markets');
const { predictedStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');

const number_of_days = [1, 3, 6];

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
        stock_details: { timestamp, open, close, high, low, volume },
    } = await realtimeStockInfo.findOne({ ticker_id: ticker });
    console.log(timestamp, open, high, low, volume);
    const new_open = open + open * 0.05;
    const new_high = high + high * 0.05;
    const new_low = low + low * 0.05;
    const new_volume = volume + volume * 0.05;
    const new_close = close + close * 0.05;

    const res = [];

    for (let days of number_of_days) {
        const date = new Date(timestamp);
        const new_date = new Date(date.setDate(date.getDate() + days));
        const new_time = new Date(new_date.setUTCHours(0));

        res.push({
            timestamp: new_time,
            open: new_open,
            close: new_close,
            high: new_high,
            low: new_low,
            volume: new_volume * 1000,
        });
    }

    return res;
};

predictPrices().then((_) => {
    console.log('completed execution');
});
