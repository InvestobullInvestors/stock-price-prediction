var express = require('express');
var router = express.Router();


const defaultPredictions = {
    company_name: "",
    ticker: "",
    inflation: 0,
    revenueGrowth: 0,
    eps: 0,
    marketCap: 0
}

const stockPredictions = [
    {
        company_name: "Tesla",
        ticker: "TSLA",
        inflation: 50,
        revenueGrowth: 80,
        eps: 1,
        marketCap: 500
    },
    {
        company_name: "AMC",
        ticker: "AMC",
        inflation: 15,
        revenueGrowth: 25,
        eps: -2.5,
        marketCap: 10
    }
]


/* GET prediction details. */
router.get('/:ticker', function (req, res) {
    const details = stockPredictions.filter((stock) => stock.ticker === req.params.ticker);
    res.send(details.length === 1 ? details[0] : defaultPredictions)
});

module.exports = router;