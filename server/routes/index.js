var express = require('express');
var router = express.Router();
const { realtimeStockInfo } = require('../dal/stock-markets');

const defaultStockList = [
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
];

/* GET home page. */
// TODO: add response codes
router.get('/', function (req, res) {
    realtimeStockInfo
        .find()
        .then((stockList) => {
            console.log('Send Res: ', stockList);
            res.send(stockList);
        })
        .catch((error) => {
            console.log(error);
            res.send(defaultStockList);
        });
});

module.exports = router;
