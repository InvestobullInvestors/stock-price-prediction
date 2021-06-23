var express = require('express');
var router = express.Router();

const defaultDetails = {
    company_name: "",
    symbol: "",
    current_price: 0,
    previous_close: 0,
    open: 0,
    last_price: 0,
    change: 0,
    change_percent: "",
    currency: "",
    volume: "",
    pe_ratio: 0,
    shares_owned: 0,
    avg_vol: "",
    market_cap: "",
    fifty_two_week_low: 0,
    fifty_two_week_high: 0
}

const stockInfo = [
    {
        company_name: "Tesla",
        symbol: "TSLA",
        current_price: 615.18,
        previous_close: 570.15,
        open: 602.14,
        last_price: 609.89,
        change: -0.23,
        change_percent: "-0.04%",
        currency: "USD",
        volume: "16.205M",
        pe_ratio: "585",
        shares_owned: 553,
        avg_vol: "31.399M",
        market_cap: "587.525B",
        fifty_two_week_low: 321.24,
        fifty_two_week_high: 900.84
    },
    {
        company_name: "AMC",
        symbol: "AMC",
        current_price: 49.11,
        last_price: 49.34,
        previous_close: 49.15,
        open: 52.14,
        change: -5.71,
        change_percent: "-10.37%",
        currency: "USD",
        volume: "138M",
        pe_ratio: "N/A",
        shares_owned: 0,
        avg_vol: "141M",
        market_cap: "25.33B",
        fifty_two_week_low: 2.54,
        fifty_two_week_high: 72.19
    }
]

/* GET stock details. */
router.get('/:ticker', function (req, res) {
    const details = stockInfo.filter((stock) => stock.symbol === req.params.ticker);
    res.send(details.length === 1 ? details[0] : defaultDetails)
});

module.exports = router;
