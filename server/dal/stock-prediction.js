const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })

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
