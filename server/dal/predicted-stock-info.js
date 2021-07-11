const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

var Schema = mongoose.Schema

var predictedStockInfoSchema = new Schema({
    market_name: String,
    market_id: String,
    stock_name: String,
    stock_id: String,
    prediction_details: {
        timestamp: Date,
        open: Number,
        close: Number,
        volume_traded: Number
    }
}, {collection: 'PredictedStockInfo'})

exports.predictedStockInfo = mongoose.model('PredictedStockInfo', predictedStockInfoSchema)
