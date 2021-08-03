const dotenv = require("dotenv");
dotenv.config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const cron = require("node-cron");
const { newsSourceInfo, stockNewsList } = require("../dal/stock-markets");

cron.schedule(
    "0 30 1 * * *",
    async () => {
        const stockNewsInfo = await stockNewsList.find({});
        for (const { news_sources } of stockNewsInfo) {
            for (const { id, name } of news_sources) {
                console.log(`Getting data from news source: ${name}`);
                const { articles } = await getNewsFromApi(id);

                newsSourceInfo.find({ source: name }).then((doc) => {
                    if (doc.length === 0) {
                        const newsInfo = new newsSourceInfo({
                            source: name,
                            stock_news: articles,
                        });
                        newsInfo.save().then(() => {
                            console.log("Save successful");
                        });
                    } else {
                        newsSourceInfo
                            .updateOne(
                                { source: name },
                                {
                                    stock_news: articles,
                                }
                            )
                            .then(() => {
                                console.log("Update successful");
                            });
                    }
                });
                console.log(`Successfully got data from news source: ${name}`);
            }
        }
    },
    {}
);

const getNewsFromApi = async (id) =>
    await newsapi.v2.topHeadlines({
        sources: `${id}`,
        language: "en",
    });
