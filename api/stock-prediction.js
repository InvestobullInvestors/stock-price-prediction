const express = require("express");
const { stockPrediction } = require("../dal/stock-prediction");
const router = express.Router();

const defaultPredictions = {
    company_name: "",
    ticker: "",
    inflation: 0,
    revenueGrowth: 0,
    eps: 0,
    marketCap: 0,
};

/* GET prediction details. */
router.get("/stock-prediction/:ticker", function (req, res) {
    stockPrediction
        .find()
        .then((stockList) => {
            const details = stockList.filter(
                (stock) => stock.ticker === req.params.ticker
            );
            res.send(details.length === 1 ? details[0] : defaultPredictions);
        })
        .catch(() => {
            res.send(defaultPredictions);
        });
});

module.exports = router;
