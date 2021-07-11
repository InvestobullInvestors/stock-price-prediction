const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

var Schema = mongoose.Schema

var historicalStockInfoSchema = new Schema({
    market_name: String,
    market_id: String,
    stock_name: String,
    stock_id: String,
    stock_details: {
        timestamp: Date,
        open: Number,
        close: Number,
        volume_traded: Number
    }
}, {collection: 'HistoricalStockInfo'})

exports.historicalStockInfo = mongoose.model('HistoricalStockInfo', historicalStockInfoSchema)
