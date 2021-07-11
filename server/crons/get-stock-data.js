const dotenv = require('dotenv');
dotenv.config();
const {stockInfo} = require("../dal/stock-info-old");

const cron = require('node-cron')

cron.schedule("22 */1 * * *", () => {
    console.log("cron job scheduled")
    var stock = {
        company_name: "XYZ",
        ticker: "XYZ",
        current_price: 0,
        previous_close: 0,
        open: 0,
        last_price: 0,
        change: 0,
        change_percent: "NA",
        currency: "NA",
        volume: "NA",
        pe_ratio: 0,
        shares_owned: 0,
        avg_vol: "NA",
        market_cap: "NA",
        fifty_two_week_low: 0,
        fifty_two_week_high: 0
    }

    var stockData = new stockInfo(stock)
    stockData.save()
    //
    //
    // console.log(stockData)
    console.log("cron job finished")
}, {})
