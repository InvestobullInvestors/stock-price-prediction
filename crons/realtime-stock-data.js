// const dotenv = require('dotenv');
// dotenv.config();
// const { stockMarketInfo, realtimeStockInfo } = require('../dal/stock-markets');
// const NewsAPI = require('newsapi');
// // const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);
// const stockDataApiKey = new NewsAPI('A0M8KW4MNBZVP0BH');
//
// const cron = require('node-cron');
// const axios = require('axios');
//
// cron.schedule(
//     '40 31 19 * * *',
//     async () => {
//         const doc = await stockMarketInfo.find({});
//         for (let market_data of doc) {
//             console.log(market_data.stocks);
//             for (let stock_data of market_data.stocks) {
//                 console.log(`Processing data for ${stock_data.ticker}`);
//                 const realTimeStockInfo = await realtimeStockInfo.findOne({
//                     ticker_id: stock_data.ticker,
//                 });
//                 const stockDataFromApi = await getStockDataFromApi(stock_data);
//                 const intraDayData = stockDataFromApi['Time Series (Daily)'];
//                 const latest_timestamp = Object.keys(intraDayData)[0];
//                 const data = intraDayData[latest_timestamp];
//                 const stock_details = {
//                     timestamp: latest_timestamp,
//                     open: data['1. open'],
//                     high: data['2. high'],
//                     low: data['3. low'],
//                     close: data['4. close'],
//                     volume: data['5. volume'],
//                 };
//
//                 if (realTimeStockInfo) {
//                     await realtimeStockInfo.updateOne(
//                         { ticker_id: stock_data.ticker },
//                         {
//                             stock_id: stock_data._id,
//                             stock_details: stock_details,
//                         }
//                     );
//                     console.log('Update successful');
//                 } else {
//                     const realTimeStockData = new realtimeStockInfo({
//                         market_name: market_data.market_name,
//                         market_id: market_data._id,
//                         stock_name: stock_data.name,
//                         ticker_id: stock_data.ticker,
//                         stock_id: stock_data._id,
//                         stock_details: stock_details,
//                     });
//                     await realTimeStockData.save();
//                     console.log('Save successful');
//                 }
//             }
//         }
//     },
//     {}
// );
//
// const getStockDataFromApi = async ({ ticker }) => {
//     const maxTries = 3;
//     for (let i = 1; i <= maxTries; i++) {
//         console.log(`Trying to get data for ${ticker} for the ${i}th time`);
//         const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${stockDataApiKey}`;
//         const { data } = await axios.get(url);
//         if (data['Time Series (Daily)']) {
//             return data;
//         } else {
//             console.log(
//                 `Errored out for ticker=${ticker}. Data received=`,
//                 data
//             );
//             await new Promise((resolve) => setTimeout(resolve, 40000));
//         }
//     }
// };
