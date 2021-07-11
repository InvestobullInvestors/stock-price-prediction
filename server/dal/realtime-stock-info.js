const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

var Schema = mongoose.Schema

var realtimeStockInfoSchema = new Schema({
    market_name: String,
    market_id: String,
    stock_name: String,
    ticker_id: String,
    stock_id: String,
    stock_details: {
        timestamp: Date,
        previous_close: Number,
        current_price: Number,
        open: Number,
        change: Number,
        change_percentage: Number,
        currency: String,
        volume: Number,
        pe_ratio: Number,
        shares_owned: Number,
        avg_vol: Number,
        market_cap: Number,
        fifty_two_week_low: Number,
        fifty_two_week_high: Number
    }
}, {collection: 'RealtimeStockInfo'})

exports.realtimeStockInfo = mongoose.model('RealtimeStockInfo', realtimeStockInfoSchema)
