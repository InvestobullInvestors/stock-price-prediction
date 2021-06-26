var express = require('express');
var router = express.Router();

const defaultNews = {
    company_name: "",
    news: []
}

const stockNews = [
    {
        company_name: "Tesla",
        ticker: "TSLA",
        news: [
            {
                id: 1,
                title: "Biden's EV charging push boosts established automakers taking on Tesla",
                src: "https://ca.finance.yahoo.com/news/bidens-ev-charging-push-boosts-163555634.html"
            },
            {
                id: 2,
                title: "The Tesla of Farming? -- Should You Buy John Deere Stock Now?",
                src: "https://www.fool.com/investing/2021/06/25/the-tesla-of-farming-should-you-buy-john-deere-sto/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article"
            }
        ]
    },
    {
        company_name: "AMC",
        ticker: "AMC",
        news: [
            {
                id: 1,
                title: "Why AMC Stock Dropped Friday",
                src: "https://ca.finance.yahoo.com/m/d302f5ac-7c42-3a1c-b14d-501a32265524/why-amc-stock-dropped-friday.html"
            },
            {
                id: 2,
                title: "3 Good Reasons to Buy a Stock -- and 1 Very Bad Reason",
                src: "https://www.fool.com/investing/2021/06/25/3-good-reasons-to-buy-a-stock-and-1-very-bad-reaso/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article"
            }
        ]
    }
]


/* GET news details. */
router.get('/:ticker', function (req, res) {
    const news = stockNews.filter((stock) => stock.ticker === req.params.ticker);
    res.send(news.length === 1 ? news[0] : defaultNews)
});


module.exports = router;