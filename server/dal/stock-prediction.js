const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

var Schema = mongoose.Schema

var stockPredictionSchema = new Schema({
    company_name: String,
    ticker: String,
    inflation: Number,
    revenueGrowth: Number,
    eps: Number,
    marketCap: Number
}, {collection: 'StockPrediction'})

exports.stockPrediction = mongoose.model('StockPrediction', stockPredictionSchema)
