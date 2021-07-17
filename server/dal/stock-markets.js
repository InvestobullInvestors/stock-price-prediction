const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

mongoose.connect(process.env.STOCK_MARKET_MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

<<<<<<< HEAD
var Schema = mongoose.Schema;

var stockMarketSchema = new Schema(
  {
=======
const Schema = mongoose.Schema

const stockMarketSchema = new Schema({
>>>>>>> origin/progress-4
    market_name: String,
    stocks: Array({
      name: String,
      ticker: String,
    }),
  },
  { collection: "StockMarket" }
);

exports.stockMarketInfo = mongoose.model("StockMarket", stockMarketSchema);

<<<<<<< HEAD
var realtimeStockInfoSchema = new Schema(
  {
=======

const realtimeStockInfoSchema = new Schema({
>>>>>>> origin/progress-4
    market_name: String,
    market_id: String,
    stock_name: String,
    ticker_id: String,
    stock_id: String,
    stock_details: {
      timestamp: String,
      open: Number,
      high: Number,
      low: Number,
      close: Number,
      volume: Number,
    },
  },
  { collection: "RealtimeStockInfo" }
);

exports.realtimeStockInfo = mongoose.model(
  "RealtimeStockInfo",
  realtimeStockInfoSchema
);

<<<<<<< HEAD
var predictedStockInfoSchema = new Schema(
  {
=======
const predictedStockInfoSchema = new Schema({
>>>>>>> origin/progress-4
    market_name: String,
    market_id: String,
    stock_name: String,
    stock_id: String,
    prediction_details: {
      timestamp: Date,
      open: Number,
      close: Number,
      volume_traded: Number,
    },
  },
  { collection: "PredictedStockInfo" }
);

exports.predictedStockInfo = mongoose.model(
  "PredictedStockInfo",
  predictedStockInfoSchema
);

<<<<<<< HEAD
var historicalStockInfoSchema = new Schema(
  {
=======
const quarterlyStockInfoSchema = new Schema({
>>>>>>> origin/progress-4
    market_name: String,
    market_id: String,
    stock_name: String,
    ticker_id: String,
    stock_id: String,
    stock_details: {
<<<<<<< HEAD
      timestamp: Date,
      open: Number,
      close: Number,
      volume_traded: Number,
    },
  },
  { collection: "HistoricalStockInfo" }
);

exports.historicalStockInfo = mongoose.model(
  "HistoricalStockInfo",
  historicalStockInfoSchema
);

var stockNewsInfoSchema = new Schema(
  {
=======
        industry: String,
        currency: String,
        pe_ratio: Number | null,
        peg_ratio: Number | null,
        eps: Number | null,
        quarterly_earning_growth: Number | null,
        quarterly_revenue_growth: Number | null,
        beta: Number | null,
        fifty_two_week_high: Number | null,
        fifty_two_week_low: Number | null,
        dividend_payout_ratio: Number | null,
        dividend_date: String,
        shares_outstanding: Number | null,
        shares_float: Number | null,
        shares_short: Number | null
    }
}, {collection: 'QuarterlyStockInfo'})

exports.quarterlyStockInfo = mongoose.model('QuarterlyStockInfo', quarterlyStockInfoSchema)


const stockNewsInfoSchema = new Schema({
>>>>>>> origin/progress-4
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
      content: String,
    }),
  },
  { collection: "StockNewsInfo" }
);

exports.stockNewsInfo = mongoose.model("StockNewsInfo", stockNewsInfoSchema);

var newsMasterlistSchema = new Schema(
  {
    name: String,
    articles: Array({
      date: Date,
      title: String,
      src: String,
    }),
  },
  { collection: "NewsMasterlist" }
);

exports.newsMasterlist = mongoose.model("NewsMasterlist", newsMasterlistSchema);
