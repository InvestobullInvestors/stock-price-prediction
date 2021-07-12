const mongoose = require("mongoose");
require('dotenv').config({path: '../.env'});

mongoose.connect(process.env.STOCK_MARKET_MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var Schema = mongoose.Schema

var stockMarketSchema = new Schema({
    market_name: String,
    stocks: Array({
        name: String,
        ticker: String
    })
}, {collection: 'StockMarket'})

exports.stockMarketInfo = mongoose.model('StockMarket', stockMarketSchema)


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

var stockNewsInfoSchema = new Schema({
    market_name: String,
    market_id: String,
    stock_name: String,
    stock_id: String,
    ticker_id: String,
    stock_news: Array({
        source: Object,
        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
        content: String
    })
}, {collection: 'StockNewsInfo'})

exports.stockNewsInfo = mongoose.model('StockNewsInfo', stockNewsInfoSchema)
