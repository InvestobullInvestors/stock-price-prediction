const dotenv = require("dotenv");
dotenv.config();
const { stockMarketInfo } = require("../dal/stock-markets");
const NewsAPI = require("newsapi");
const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);

const cron = require("node-cron");
const axios = require("axios");
const { dailyGraphInfo } = require("../dal/stock-markets");

cron.schedule(
    "0 0 0 * * *",
    async () => {
        const doc = await stockMarketInfo.find({});
        for (let market_data of doc) {
            for (let stock_data of market_data.stocks) {
                console.log(`Processing data for ${stock_data.ticker}`);
                const dailyGraphData = await dailyGraphInfo.findOne({
                    ticker_id: stock_data.ticker,
                });

                const dailyStockDataFromApi = await getStockDataFromApi(
                    stock_data
                );
                const timeSeriesData =
                    dailyStockDataFromApi["Time Series (Daily)"];

                const timestamps = Object.keys(timeSeriesData);
                if (dailyGraphData) {
                    pass;
                } else {
                    const stock_details = [];
                    timestamps.forEach((timestamp) => {
                        const timeStampData = timeSeriesData[timestamp];
                        stock_details.push({
                            timestamp: timestamp,
                            open: timeStampData["1. open"],
                            high: timeStampData["2. high"],
                            low: timeStampData["3. low"],
                            close: timeStampData["4. close"],
                            volume: timeStampData["5. volume"],
                        });
                    });

                    const dailyStockData = new dailyGraphInfo({
                        market_name: market_data.market_name,
                        market_id: market_data._id,
                        stock_name: stock_data.name,
                        ticker_id: stock_data.ticker,
                        stock_id: stock_data._id,
                        stock_details: stock_details,
                    });
                    await dailyStockData.save();
                    console.log("Save successful");
                }
            }
        }
    },
    {}
);

const getStockDataFromApi = async ({ ticker }) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${stockDataApiKey}`;
    const { data } = await axios.get(url);
    return data;
};
