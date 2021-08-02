const dotenv = require("dotenv");
dotenv.config();
const { stockMarketInfo, stockNewsInfo } = require("../dal/stock-markets");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const cron = require("node-cron");

cron.schedule(
    "0 0 2 * * *",
    async () => {
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
    },
    {}
);

const newsArticleExists = (stock_news, article) =>
    stock_news.find((news) => news["publishedAt"] === article.publishedAt);

const getStockNewsFromApi = async ({ name }) =>
    await newsapi.v2.topHeadlines({
        q: `${name}`,
        language: "en",
    });
