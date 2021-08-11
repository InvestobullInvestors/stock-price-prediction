const { stockMarketInfo } = require('../dal/stock-markets');

const MARKET_DATA = [
    {
        market_name: 'Nasdaq',
        stocks: [
            {
                ticker: 'NVDA',
                name: 'Nvidia',
            },
            {
                ticker: 'PYPL',
                name: 'PayPal',
            },
            {
                ticker: 'MSFT',
                name: 'Microsoft',
            },
            {
                ticker: 'ADBE',
                name: 'Adobe',
            },
            {
                ticker: 'PEP',
                name: 'PepsiCo',
            },
            {
                ticker: 'UBER',
                name: 'Uber',
            },
            {
                ticker: 'NFLX',
                name: 'Netflix',
            },
            {
                ticker: 'CMCSA',
                name: 'Comcast',
            },
            {
                ticker: 'INTC',
                name: 'Intel',
            },
            {
                ticker: 'TSLA',
                name: 'Tesla',
            },
            {
                ticker: 'CSCO',
                name: 'Cisco',
            },
            {
                ticker: 'AVGO',
                name: 'Broadcom',
            },
            {
                ticker: 'QCOM',
                name: 'Qualcomm',
            },
            {
                ticker: 'COST',
                name: 'Costco Wholesale Corporation',
            },
            {
                ticker: 'AMZN',
                name: 'Amazon',
            },
            {
                ticker: 'GOOGL',
                name: 'Google',
            },
            {
                ticker: 'FB',
                name: 'Facebook',
            },
            {
                ticker: 'TXN',
                name: 'Texas Instruments',
            },
            {
                ticker: 'TWTR',
                name: 'Twitter',
            },
            {
                ticker: 'AAPL',
                name: 'Apple',
            },
            {
                ticker: 'AAPL',
                name: 'Apple',
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
                    console.log('Update successful');
                    process.exit(1);
                });
        }
    });
}
