var express = require('express');
var router = express.Router();

const defaultDetails = {
    company_name: "",
    symbol: "",
    previous_close: 0,
    open: 0,
    last_price: 0,
    change: 0,
    change_percent: "",
    currency: "",
    volume: "",
    shares_owned: 0,
    avg_vol: "",
    market_cap: "",
}

const stockInfo = [
    {
        company_name: "Tesla",
        symbol: "TSLA",
        previous_close: 570.15,
        open: 602.14,
        last_price: 609.89,
        change: -0.23,
        change_percent: "-0.04%",
        currency: "USD",
        volume: "16.205M",
        shares_owned: 553,
        avg_vol: "31.399M",
        market_cap: "587.525B",
    },
    {
        company_name: "AMC",
        symbol: "AMC",
        last_price: 49.34,
        previous_close: 49.15,
        open: 52.14,
        change: -5.71,
        change_percent: "-10.37%",
        currency: "USD",
        volume: "138M",
        shares_owned: 0,
        avg_vol: "141M",
        market_cap: "25.33B",
    }
]

/* GET stock details. */
router.get('/:ticker', function(req, res, next) {
    const ticketSymbol = req.params.ticker;
    const details = stockInfo.filter((stock) => stock.symbol === ticketSymbol);

    res.send(details.length === 1 ? details[0] : defaultDetails)
});

module.exports = router;
