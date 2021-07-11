// var express = require('express');
// const mongoose = require("mongoose");
// var router = express.Router();
//
// mongoose.connect("mongodb+srv://investobull:investobull9876!@stock-price-prediction.bg5zs.mongodb.net/stock-data")
// var Schema = mongoose.Schema
//
// var stockDataSchema = new Schema({
//     company_name: String,
//     ticker: String,
//     current_price: Number,
//     previous_close: Number,
//     open: Number,
// }, {collection: 'stockDataCollection'})
//
// var stockData = mongoose.model('stockDataCollection', stockDataSchema)
//
// /* GET all stock data. */
// router.get('/', function (req, res) {
//     stockData.find().then(doc => {
//         res.send(doc)
//     })
// });
//
// /* GET individual stock data. */
// router.get('/:ticker', function (req, res) {
//     stockData.find().then(doc => {
//         res.send(
//             doc.filter(stockDetails => stockDetails.ticker === req.params.ticker)
//         )
//     })
// });
//
// module.exports = router;
