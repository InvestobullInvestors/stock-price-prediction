const dotenv = require("dotenv");
dotenv.config();
const { stockMarketInfo, realtimeStockInfo } = require("../dal/stock-markets");
const NewsAPI = require("newsapi");
const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);

const cron = require("node-cron");
const axios = require("axios");

cron.schedule(
    "0 0 */2 * * *",
    async () => {
        const doc = await stockMarketInfo.find({});
        for (let market_data of doc) {
            for (let stock_data of market_data.stocks) {
                console.log(`Processing data for ${stock_data.ticker}`);
                const realTimeStockInfo = await realtimeStockInfo.findOne({
                    ticker_id: stock_data.ticker,
                });
                const stockDataFromApi = await getStockDataFromApi(stock_data);
                const intraDayData = stockDataFromApi["Time Series (5min)"];
                const latest_timestamp = Object.keys(intraDayData)[0];
                const data = intraDayData[latest_timestamp];
                const stock_details = {
                    timestamp: latest_timestamp,
                    open: data["1. open"],
                    high: data["2. high"],
                    low: data["3. low"],
                    close: data["4. close"],
                    volume: data["5. volume"],
                };

                if (realTimeStockInfo) {
                    await realtimeStockInfo.updateOne(
                        { ticker_id: stock_data.ticker },
                        {
                            stock_id: stock_data._id,
                            stock_details: stock_details,
                        }
                    );
                    console.log("Update successful");
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
                    console.log("Save successful");
                }
            }
        }
    },
    {}
);

const getStockDataFromApi = async ({ ticker }) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${stockDataApiKey}`;
    const { data } = await axios.get(url);
    return data;
};
