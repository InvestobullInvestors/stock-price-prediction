var express = require('express');
var router = express.Router();
const { realtimeStockInfo } = require('../dal/stock-markets');

const defaultStockList = [{}];

/* GET home page. */
// TODO: add response codes
router.get('/', function (req, res) {
    realtimeStockInfo
        .find()
        .then((stockList) => {
            res.send(stockList);
        })
        .catch((error) => {
            console.log(error);
            res.send(defaultStockList);
        });
});

module.exports = router;
