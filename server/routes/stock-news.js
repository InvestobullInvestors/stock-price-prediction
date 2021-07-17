var express = require("express");
var router = express.Router();

const { stockNewsInfo } = require("../dal/stock-markets");
const { newsMasterlist } = require("../dal/stock-markets");

const defaultNews = {
  company_name: "",
  news: [],
};

/* GET news details. */
router.get("/news/:ticker", function (req, res) {
  const { ticker } = req.params;
  stockNewsInfo
    .findOne({ ticker_id: ticker })
    .then(({ stock_name, stock_news }) => {
      res.send({ company_name: stock_name, news: stock_news.slice(0, 5) });
    })
    .catch((error) => {
      console.log(error.message);
      res.send(defaultNews);
    });
});

router.get("/newsSelections", function (req, res) {
  res.send(newsSelections);
});

router.get("/newsMasterlist", function (req, res) {
  res.send(newsMasterlist);
});

router.post("/reorderNews", function (req, res) {
  const { sources } = req.body;
  newsSelections = sources;
  res.send(newsSelections);
});

router.post("/selectSource", function (req, res) {
  const { source } = req.body;
  let selectedSource = newsSelections.find(
    (currSource) => currSource.id === source.id
  );
  selectedSource.selected = !selectedSource.selected;
  res.send(newsSelections);
});

router.post("/selectAllSources", function (req, res) {
  newsSelections = newsSelections.map(({ selected, ...rest }) => ({
    ...rest,
    selected: true,
  }));
  res.send(newsSelections);
});

router.post("/unselectAllSources", function (req, res) {
  newsSelections = newsSelections.map(({ selected, ...rest }) => ({
    ...rest,
    selected: false,
  }));
  res.send(newsSelections);
});

module.exports = router;
