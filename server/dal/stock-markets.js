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
