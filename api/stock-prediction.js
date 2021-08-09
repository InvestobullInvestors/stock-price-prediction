const express = require('express');
const { predictedStockInfo } = require('../dal/stock-markets');
const router = express.Router();

/* GET prediction details. */
router.get('/stock-prediction/:ticker', function (req, res) {
    const { ticker } = req.params;
    predictedStockInfo
        .findOne({ ticker_id: ticker })
        .then(({ stock_name, ticker_id, prediction_details }) => {
            res.send({ stock_name, ticker_id, prediction_details });
        })
        .catch(() => {
            res.send([]);
        });
});

module.exports = router;
