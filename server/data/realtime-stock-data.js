const {stockMarketInfo} = require("../dal/stock-markets");
const {realtimeStockInfo} = require("../dal/realtime-stock-info");

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


// const generateUniqueID = () => (
//     new mongoose.Types.ObjectId()
// )
//
// const MARKET_DATA = [{
//     market_name: "Nasdaq",
//     stocks: [
//         {
//             id: generateUniqueID(),
//             ticker: "TSLA",
//             name: "Tesla"
//         },
//         {
//             id: generateUniqueID(),
//             ticker: "AMZN",
//             name: "Amazon"
//         },
//         {
//             id: generateUniqueID(),
//             ticker: 'GOOGL',
//             name: "Google"
//         },
//         {
//             id: generateUniqueID(),
//             ticker: 'FB',
//             name: "Facebook"
//         },
//         {
//             id: generateUniqueID(),
//             ticker: 'TWTR',
//             name: "Twitter"
//         }
//     ]
// }]
//
// for (const data of MARKET_DATA) {
//     const {market_name, stocks} = data
//
//     stockMarketInfo.find({market_name: market_name}).then((doc) => {
//         if (doc.length === 0) {
//             var stockMarketData = new stockMarketInfo(data)
//             stockMarketData.save().then(marketData => {
//                 console.log(marketData)
//                 process.exit(1)
//             })
//         } else {
//             stockMarketInfo.updateOne({market_name: market_name}, {
//                 stocks: stocks
//             }).then(_ => {
//                 console.log('Update successful')
//                 process.exit(1)
//             })
//         }
//     })
// }
