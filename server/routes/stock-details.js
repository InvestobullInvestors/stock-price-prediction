var express = require('express');
const {stockInfo} = require("../dal/stock-info");
var router = express.Router();

const defaultDetails = {
    company_name: "",
    ticker: "",
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


/* GET stock details. */
router.get('/:ticker', function (req, res) {
    stockInfo.find().then(stockList => {
        const details = stockList.filter((stock) => stock.ticker === req.params.ticker);
        res.send(details.length === 1 ? details[0] : defaultDetails)
    }).catch((_) => {
        res.send(defaultDetails)
    })
});

module.exports = router;
