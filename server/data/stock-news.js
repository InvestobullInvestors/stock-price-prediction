const {stockNewsInfo} = require("../dal/stock-news-info");
const {stockMarketInfo} = require("../dal/stock-markets");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('11f5890322714a4892c2b164660fbd4a');

const getNewsData = async () => {
    const doc = await stockMarketInfo.find({})
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            const result = await stockNewsInfo.findOne({ticker_id: stock_data.ticker})
            const news_data = await getStockNewsFromApi(stock_data)
            const {articles} = news_data
            if (result) {
                const {stock_news} = result
                const filteredArticles = articles.filter((article) => {
                    return !newsArticleExists(stock_news, article)
                })
                await stockNewsInfo.updateOne({ticker_id: stock_data.ticker}, {
                    stock_id: stock_data._id,
                    stock_news: [...filteredArticles, ...stock_news]
                })
                console.log(`Successfully updated news for stock: ${stock_data.name}`)
            } else {
                var stockNewsData = new stockNewsInfo({
                    market_name: market_data.market_name,
                    market_id: market_data._id,
                    stock_name: stock_data.name,
                    ticker_id: stock_data.ticker,
                    stock_id: stock_data._id,
                    stock_news: articles
                })
                await stockNewsData.save()
                console.log(`Successfully added news for stock: ${stock_data.name}`)
            }
        }
    }
    process.exit(1)
}

const newsArticleExists = (stock_news, article) => (
    stock_news.find(news => news['publishedAt'] === article.publishedAt)
)

const getStockNewsFromApi = async ({name}) => (
    await newsapi.v2.topHeadlines({
        q: `${name}`,
        language: 'en',
    })
)

getNewsData()
