const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

var Schema = mongoose.Schema

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
