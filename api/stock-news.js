const express = require("express");
const { newsSourceInfo } = require("../dal/stock-markets");
const router = express.Router();

const { stockNewsInfo } = require("../dal/stock-markets");

let newsSelections = [
    {
        id: "0",
        name: "Bloomberg",
        selected: true,
    },
    {
        id: "1",
        name: "Financial Post",
        selected: true,
    },
    {
        id: "2",
        name: "Financial Times",
        selected: true,
    },
    {
        id: "3",
        name: "The Economist",
        selected: true,
    },
    {
        id: "4",
        name: "The Global and Mail",
        selected: true,
    },
    {
        id: "5",
        name: "The New York Times",
        selected: true,
    },
    {
        id: "6",
        name: "The Wall Street Journal",
        selected: true,
    },
    {
        id: "7",
        name: "Time",
        selected: true,
    },
];

const defaultNews = {
    company_name: "",
    news: [],
};

/* GET news details. */
router.get("/stock-news/news/:ticker", function (req, res) {
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

/* GET list of all news sources. */
router.get("/stock-news/newsSourceList", function (req, res) {
    newsSourceInfo
        .find({})
        .then((newsDetails) => {
            const news = [];
            for (const sourceNews of newsDetails) {
                const { _id, source } = sourceNews;
                news.push({
                    id: _id,
                    name: source,
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

/* GET information from each news source. */
router.get("/stock-news/newsSourceInfo", function (req, res) {
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
                });
            }
            res.send(news);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

router.post("/stock-news/reorderNews", function (req, res) {
    const { sources } = req.body;
    newsSelections = sources;
    res.send(newsSelections);
});

router.post("/stock-news/selectSource", function (req, res) {
    const { source } = req.body;
    let selectedSource = newsSelections.find(
        (currSource) => currSource.id === source.id
    );
    selectedSource.selected = !selectedSource.selected;
    res.send(newsSelections);
});

router.post("/stock-news/selectAllSources", function (req, res) {
    newsSelections = newsSelections.map(({ selected, ...rest }) => ({
        ...rest,
        selected: true,
    }));
    res.send(newsSelections);
});

router.post("/stock-news/unselectAllSources", function (req, res) {
    newsSelections = newsSelections.map(({ selected, ...rest }) => ({
        ...rest,
        selected: false,
    }));
    res.send(newsSelections);
});

module.exports = router;
