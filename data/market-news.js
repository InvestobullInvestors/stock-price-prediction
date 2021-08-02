const { stockNewsList } = require("../dal/stock-markets");
const MARKET_NEWS = [
    {
        country: "USA",
        news_sources: [
            {
                id: "bloomberg",
                name: "Bloomberg",
            },
            {
                id: "financial-post",
                name: "Financial Post",
            },
            {
                id: "abc-news",
                name: "ABC News",
            },
            {
                id: "google-news",
                name: "Google News",
            },
            {
                id: "the-verge",
                name: "The Verge",
            },
        ],
    },
];

for (const data of MARKET_NEWS) {
    const { country, news_sources } = data;
    stockNewsList.find({ country: country }).then((doc) => {
        if (doc.length === 0) {
            const marketNews = new stockNewsList(data);
            marketNews.save().then((news) => {
                console.log(news);
            });
        } else {
            stockNewsList
                .updateOne(
                    { country: country },
                    {
                        news_sources: news_sources,
                    }
                )
                .then(() => {
                    console.log("Update successful");
                });
        }
    });
}
