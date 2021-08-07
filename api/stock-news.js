const express = require('express');
const { newsSourceInfo } = require('../dal/stock-markets');
const router = express.Router();

const { stockNewsInfo } = require('../dal/stock-markets');

const defaultNews = {
    company_name: '',
    news: [],
};

/* GET news details. */
router.get('/stock-news/news/:ticker', function (req, res) {
    const { ticker } = req.params;
    stockNewsInfo
        .findOne({ ticker_id: ticker })
        .then(({ stock_name, stock_news }) => {
            res.send({
                company_name: stock_name,
                news: stock_news.slice(0, 5),
            });
        })
        .catch(({ message }) => {
            console.log(message);
            res.send(defaultNews);
        });
});

/* GET news details for multiple stocks. */
router.post('/stock-news/stocks/', function (req, res) {
    const { stockSymbols } = req.body;

    stockNewsInfo
        .find({ ticker_id: stockSymbols })
        .sort({ ticker_id: 1 })
        .then((newsInfo) => {
            res.send(
                newsInfo.map(({ ticker_id, stock_name, stock_news }) => ({
                    ticker_id: ticker_id,
                    stock_name: stock_name,
                    news: stock_news.slice(0, 5),
                    selected: true,
                }))
            );
        })
        .catch(({ message }) => {
            console.log(message);
            res.send({});
        });
});

/* GET information from each news source. */
router.get('/stock-news/news-source-info', function (req, res) {
    newsSourceInfo
        .find({})
        .then((newsDetails) => {
            const news = [];
            for (const sourceNews of newsDetails) {
                const { _id, source, stock_news } = sourceNews;
                news.push({
                    id: _id,
                    name: source,
                    articles: stock_news.slice(0, 5),
                    selected: true,
                });
            }
            res.send(news);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

module.exports = router;
