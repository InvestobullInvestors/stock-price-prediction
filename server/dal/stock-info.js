const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var stockInfoSchema = new Schema({
    company_name: String,
    ticker: String,
    current_price: Number,
    previous_close: Number,
    open: Number,
    last_price: Number,
    change: Number,
    change_percent: String,
    currency: String,
    volume: String,
    pe_ratio: Number,
    shares_owned: Number,
    avg_vol: String,
    market_cap: String,
    fifty_two_week_low: Number,
    fifty_two_week_high: Number
}, {collection: 'StockInfo'})

exports.stockInfo = mongoose.model('StockInfo', stockInfoSchema)
