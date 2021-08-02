const express = require("express");
const {
    quarterlyStockInfo,
    realtimeStockInfo,
} = require("../dal/stock-markets");
const router = express.Router();

const defaultData = {
    stock_details: {},
};

/* GET all quarterly stock details. */
router.get("/stock-details", function (req, res) {
    quarterlyStockInfo
        .find({})
        .then((stock_info) => {
            const result = [];
            for (let stocks of stock_info) {
                const { stock_details } = stocks;
                result.push({
                    stock_name: stocks.stock_name,
                    ticker_id: stocks.ticker_id,
                    currency: stock_details.currency,
                    pe_ratio: stock_details.pe_ratio,
                    peg_ratio: stock_details.peg_ratio,
                    quarterly_earning_growth:
                        stock_details.quarterly_earning_growth,
                    quarterly_revenue_growth:
                        stock_details.quarterly_revenue_growth,
                    fifty_two_week_high: stock_details.fifty_two_week_high,
                    fifty_two_week_low: stock_details.fifty_two_week_low,
                    dividend_payout_ratio: stock_details.dividend_payout_ratio,
                });
            }
            res.send(result);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

/* GET quarterly stock details with string of tickers. */
router.get("/stock-details/:tickerString", function (req, res) {
    const { tickerString } = req.params;
    const tickerArray = tickerString.split("-");
    quarterlyStockInfo
        .find({ ticker_id: tickerArray })
        .then((stocks) => {
            const result = [];
            stocks.forEach((stock) => {
                const { stock_details } = stock;
                result.push({
                    stock_name: stock.stock_name,
                    ticker_id: stock.ticker_id,
                    currency: stock_details.currency,
                    pe_ratio: stock_details.pe_ratio,
                    peg_ratio: stock_details.peg_ratio,
                    quarterly_earning_growth:
                        stock_details.quarterly_earning_growth,
                    quarterly_revenue_growth:
                        stock_details.quarterly_revenue_growth,
                    fifty_two_week_high: stock_details.fifty_two_week_high,
                    fifty_two_week_low: stock_details.fifty_two_week_low,
                    dividend_payout_ratio: stock_details.dividend_payout_ratio,
                });
            });
            res.send(result);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

/* GET realtime stock details. */
router.get("/stock-details/realtime-data/:ticker", function (req, res) {
    const { ticker } = req.params;
    realtimeStockInfo
        .findOne({ ticker_id: ticker })
        .then(({ stock_name, stock_details }) => {
            res.send({ stock_name, stock_details });
        })
        .catch(({ message }) => {
            console.log(message);
            res.send(defaultData);
        });
});

/* GET quarterly stock details. */
router.get("/stock-details/quarterly-data/:ticker", function (req, res) {
    const { ticker } = req.params;
    quarterlyStockInfo
        .findOne({ ticker_id: ticker })
        .then(({ stock_name, stock_details }) => {
            res.send({ stock_name, stock_details });
        })
        .catch(({ message }) => {
            console.log(message);
            res.send(defaultData);
        });
});

/* GET filtered stock details. */
router.post("/stock-details/filter-stocks", function (req, res) {
    const { key_word } = req.body;
    quarterlyStockInfo
        .find({ ticker_id: { $regex: key_word, $options: "si" } })
        .then((stock_details) => {
            const result = [];
            for (let stocks of stock_details) {
                const { stock_details } = stocks;
                result.push({
                    stock_name: stocks.stock_name,
                    ticker_id: stocks.ticker_id,
                    currency: stock_details.currency,
                    pe_ratio: stock_details.pe_ratio,
                    peg_ratio: stock_details.peg_ratio,
                    quarterly_earning_growth:
                        stock_details.quarterly_earning_growth,
                    quarterly_revenue_growth:
                        stock_details.quarterly_revenue_growth,
                    fifty_two_week_high: stock_details.fifty_two_week_high,
                    fifty_two_week_low: stock_details.fifty_two_week_low,
                    dividend_payout_ratio: stock_details.dividend_payout_ratio,
                });
            }
            res.send(result);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

/* GET sorted stock details. */
router.post("/stock-details/sort-stocks", function (req, res) {
    const { ticker_list, table_header_key } = req.body;
    quarterlyStockInfo
        .find({ ticker_id: ticker_list })
        .sort({ [`stock_details.${table_header_key}`]: -1 })
        .then((stock_details) => {
            const result = [];
            for (let stocks of stock_details) {
                const { stock_details } = stocks;
                result.push({
                    stock_name: stocks.stock_name,
                    ticker_id: stocks.ticker_id,
                    currency: stock_details.currency,
                    pe_ratio: stock_details.pe_ratio,
                    peg_ratio: stock_details.peg_ratio,
                    quarterly_earning_growth:
                        stock_details.quarterly_earning_growth,
                    quarterly_revenue_growth:
                        stock_details.quarterly_revenue_growth,
                    fifty_two_week_high: stock_details.fifty_two_week_high,
                    fifty_two_week_low: stock_details.fifty_two_week_low,
                    dividend_payout_ratio: stock_details.dividend_payout_ratio,
                });
            }
            res.send(result);
        })
        .catch(({ message }) => {
            console.log(message);
            res.send([]);
        });
});

module.exports = router;
