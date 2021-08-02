const mongoose = require("mongoose");

mongoose.connect(process.env.STOCK_MARKET_MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const stockMarketSchema = new Schema(
    {
        market_name: String,
        stocks: Array({
            name: String,
            ticker: String,
        }),
    },
    { collection: "StockMarket" }
);

exports.stockMarketInfo = mongoose.model("StockMarket", stockMarketSchema);

const realtimeStockInfoSchema = new Schema(
    {
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

const predictedStockInfoSchema = new Schema(
    {
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

const quarterlyStockInfoSchema = new Schema(
    {
        market_name: String,
        market_id: String,
        stock_name: String,
        ticker_id: String,
        stock_id: String,
        stock_details: {
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
            shares_short: Number | null,
        },
    },
    { collection: "QuarterlyStockInfo" }
);

exports.quarterlyStockInfo = mongoose.model(
    "QuarterlyStockInfo",
    quarterlyStockInfoSchema
);

const dailyGraphInfoSchema = new Schema(
    {
        market_name: String,
        market_id: String,
        stock_name: String,
        ticker_id: String,
        stock_id: String,
        stock_details: Array({
            timestamp: String,
            open: Number,
            high: Number,
            low: Number,
            close: Number,
            volume: Number,
        }),
    },
    { collection: "DailyGraphInfo" }
);

exports.dailyGraphInfo = mongoose.model("DailyGraphInfo", dailyGraphInfoSchema);

const stockNewsListSchema = new Schema(
    {
        country: String,
        news_sources: Array({
            id: String,
            name: String,
        }),
    },
    { collection: "StockNewsList" }
);

exports.stockNewsList = mongoose.model("StockNewsList", stockNewsListSchema);

const newsSourceInfoSchema = new Schema(
    {
        source: String,
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
    { collection: "NewsSourceInfo" }
);

exports.newsSourceInfo = mongoose.model("NewsSourceInfo", newsSourceInfoSchema);

const stockNewsInfoSchema = new Schema(
    {
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

const newsMasterlistSchema = new Schema(
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
