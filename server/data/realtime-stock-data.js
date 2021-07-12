const {realtimeStockInfo} = require("../dal/stock-markets");
const {stockMarketInfo} = require("../dal/stock-markets");

const getRealtimeStockData = async () => {
    const doc = await stockMarketInfo.find({})
    for (let market_data of doc) {
        console.log(market_data.market_name)
        for (let stock_data of market_data.stocks) {
            console.log(stock_data._id, stock_data.ticker, stock_data.name)
            const result = await realtimeStockInfo.findOne({ticker_id: stock_data.ticker})
            console.log(result)
            if (result) {
                await realtimeStockInfo.updateOne({ticker_id: stock_data.ticker}, {
                    stock_id: stock_data._id,
                    stock_details: {}
                })
                console.log('Update successful')
            } else {
                var realTimeStockData = new realtimeStockInfo({
                    market_name: market_data.market_name,
                    market_id: market_data._id,
                    stock_name: stock_data.name,
                    ticker_id: stock_data.ticker,
                    stock_id: stock_data._id,
                    stock_details: {}
                })
                await realTimeStockData.save()
                console.log('Save successful')
            }
        }

    }
}

getRealtimeStockData()
