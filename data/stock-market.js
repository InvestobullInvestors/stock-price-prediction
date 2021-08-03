const { stockMarketInfo } = require("../dal/stock-markets");

const MARKET_DATA = [
    {
        market_name: "Nasdaq",
        stocks: [
            {
                ticker: "TSLA",
                name: "Tesla",
            },
            {
                ticker: "AMZN",
                name: "Amazon",
            },
            {
                ticker: "GOOGL",
                name: "Google",
            },
            {
                ticker: "FB",
                name: "Facebook",
            },
            {
                ticker: "TWTR",
                name: "Twitter",
            },
            {
                ticker: "UBER",
                name: "Uber",
            },
        ],
    },
];

for (const data of MARKET_DATA) {
    const { market_name, stocks } = data;

    stockMarketInfo.find({ market_name: market_name }).then((doc) => {
        if (doc.length === 0) {
            const stockMarketData = new stockMarketInfo(data);
            stockMarketData.save().then((marketData) => {
                console.log(marketData);
                process.exit(1);
            });
        } else {
            stockMarketInfo
                .updateOne(
                    { market_name: market_name },
                    {
                        stocks: stocks,
                    }
                )
                .then(() => {
                    console.log("Update successful");
                    process.exit(1);
                });
        }
    });
}
