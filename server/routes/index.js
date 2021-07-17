var express = require('express');
var router = express.Router();

const stockList = [
    {
        company_name: 'Tesla',
        ticker: 'TSLA',
        current_price: 615.18,
        previous_close: 570.15,
        open: 602.14,
        last_price: 609.89,
        change: -0.23,
        change_percent: '-0.04%',
        currency: 'USD',
        volume: '16.205M',
        pe_ratio: '585',
        shares_owned: 553,
        avg_vol: '31.399M',
        market_cap: '587.525B',
        fifty_two_week_low: 321.24,
        fifty_two_week_high: 900.84,
    },
    {
        company_name: 'AMC',
        ticker: 'AMC',
        current_price: 49.11,
        last_price: 49.34,
        previous_close: 49.15,
        open: 52.14,
        change: -5.71,
        change_percent: '-10.37%',
        currency: 'USD',
        volume: '138M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '141M',
        market_cap: '25.33B',
        fifty_two_week_low: 2.54,
        fifty_two_week_high: 72.19,
    },
    {
        company_name: 'BB',
        ticker: 'BB',
        current_price: 59.11,
        last_price: 39.34,
        previous_close: 49.15,
        open: 62.14,
        change: 6.71,
        change_percent: '10.37%',
        currency: 'USD',
        volume: '112M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '114M',
        market_cap: '32.33B',
        fifty_two_week_low: 2.54,
        fifty_two_week_high: 72.19,
    },
    {
        company_name: 'U',
        ticker: 'U',
        current_price: 112.12,
        last_price: 109.34,
        previous_close: 105.35,
        open: 111.14,
        change: 30.71,
        change_percent: '20.37%',
        currency: 'USD',
        volume: '150M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '153M',
        market_cap: '40.33B',
        fifty_two_week_low: 2.54,
        fifty_two_week_high: 72.19,
    },
];

/* GET home page. */
router.get('/', function (req, res) {
    res.send(stockList);
});

module.exports = router;
