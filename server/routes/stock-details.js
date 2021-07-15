var express = require('express');
const {quarterlyStockInfo, realtimeStockInfo} = require("../dal/stock-markets");
var router = express.Router();

const defaultData = {
    stock_details: {}
}

/* GET realtime stock details. */
router.get('/realtime-data/:ticker', function (req, res) {
    const {ticker} = req.params
    realtimeStockInfo.findOne({ticker_id: ticker}).then(({stock_name, stock_details}) => {
        res.send({stock_name, stock_details})
    }).catch(error => {
        console.log(error.message)
        res.send(defaultData)
    })
});

/* GET quarterly stock details. */
router.get('/quarterly-data/:ticker', function (req, res) {
    const {ticker} = req.params
    quarterlyStockInfo.findOne({ticker_id: ticker}).then(({stock_name, stock_details}) => {
        res.send({stock_name, stock_details})
    }).catch(error => {
        console.log(error.message)
        res.send(defaultData)
    })
});

module.exports = router;
