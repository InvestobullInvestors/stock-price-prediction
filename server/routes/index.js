var express = require('express');
var router = express.Router();
// const { quarterlyStockInfo } = require('../dal/stock-markets');

const stockList = [
    {
        company_name: 'Tesla',
        ticker: 'TSLA',
        current_price: 655.39,
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
        fifty_two_week_low: 273,
        fifty_two_week_high: 895.9,
    },
    {
        company_name: 'Amazon',
        ticker: 'AMZN',
        current_price: 3717.25,
        last_price: 3713.32,
        previous_close: 43723.21,
        open: 52.14,
        change: -5.71,
        change_percent: '-10.37%',
        currency: 'USD',
        volume: '138M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '141M',
        market_cap: '25.33B',
        fifty_two_week_low: 2871,
        fifty_two_week_high: 3773.08,
    },
    {
        company_name: 'Google',
        ticker: 'GOOGL',
        current_price: 2506.98,
        last_price: 2403.23,
        previous_close: 2404.43,
        open: 62.14,
        change: 6.71,
        change_percent: '10.37%',
        currency: 'USD',
        volume: '112M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '114M',
        market_cap: '32.33B',
        fifty_two_week_low: 1402.15,
        fifty_two_week_high: 2560.82,
    },
    {
        company_name: 'Facebook',
        ticker: 'FB',
        current_price: 350.45,
        last_price: 340.45,
        previous_close: 105.35,
        open: 111.14,
        change: 30.71,
        change_percent: '30.37%',
        currency: 'USD',
        volume: '150M',
        pe_ratio: 'N/A',
        shares_owned: 0,
        avg_vol: '153M',
        market_cap: '40.33B',
        fifty_two_week_low: 358.79,
        fifty_two_week_high: 226.9,
    },
];

/* GET home page. */
router.get('/', function (req, res) {
    res.send(stockList);
});

module.exports = router;
