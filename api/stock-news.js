const express = require('express');
const { newsSourceInfo } = require('../dal/stock-markets');
const router = express.Router();

const { stockNewsInfo } = require('../dal/stock-markets');

let newsSelections = [
    {
        id: '0',
        name: 'Bloomberg',
        selected: true,
    },
    {
        id: '1',
        name: 'Financial Post',
        selected: true,
    },
    {
        id: '2',
        name: 'ABC News',
        selected: true,
    },
    {
        id: '3',
        name: 'Google News',
        selected: true,
    },
    {
        id: '4',
        name: 'The Verge',
        selected: true,
    },
];

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

router.post('/stock-news/reorder-news', function (req, res) {
    const { sources } = req.body;
    newsSelections = sources;
    res.send(newsSelections);
});

router.post('/stock-news/select-source', function (req, res) {
    const { source } = req.body;
    let selectedSource = newsSelections.find(
        (currSource) => currSource.id === source.id
    );
    console.log(selectedSource);
    console.log(selectedSource.selected);
    selectedSource.selected = !selectedSource.selected;
    console.log(selectedSource.selected);
    res.send(newsSelections);
});

router.post('/stock-news/select-all-sources', function (req, res) {
    newsSelections = newsSelections.map(({ selected, ...rest }) => ({
        ...rest,
        selected: true,
    }));
    res.send(newsSelections);
});

router.post('/stock-news/unselect-all-sources', function (req, res) {
    newsSelections = newsSelections.map(({ selected, ...rest }) => ({
        ...rest,
        selected: false,
    }));
    res.send(newsSelections);
});

module.exports = router;
