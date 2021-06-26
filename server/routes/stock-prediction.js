var express = require('express');
var router = express.Router();


const defaultPredictions = {
    company_name: "",
    inflation: 0,
    revenueGrowth: 0
}

const stockPredictions = [
    {
        company_name: "Tesla",
        symbol: "TSLA",
        inflation: 50,
        revenueGrowth: 80,
        eps: 300,
        marketCap: 500
    },
    {
        company_name: "AMC",
        symbol: "AMC",
        inflation: 15,
        revenueGrowth: 25,
        eps: 20,
        marketCap: 10
    }
]


/* GET prediction details. */
router.get('/:ticker', function (req, res) {
    const details = stockPredictions.filter((stock) => stock.symbol === req.params.ticker);
    res.send(details.length === 1 ? details[0] : defaultPredictions)
});

module.exports = router;