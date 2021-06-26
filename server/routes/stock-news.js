var express = require('express');
var router = express.Router();

const newsSources = [
    "Bloomberg",
    "Financial Post",
    "Financial Times",
    "The Economist",
    "The Global and Mail",
    "The New York Times",
    "The Wall Street Journal",
    "Time"
]

const newsInfo = [
    {
        name: "Bloomberg",
        articles: [
            {
                title: "BlackBerry CEO focused on fundamentals, not Reddit frenzy",
                src: "https://www.bnnbloomberg.ca/blackberry-ceo-focused-on-fundamentals-not-reddit-frenzy-1.1621812",
                date: "2021-06-26"
            },
            {
                title: "Wall Street and C-Suite grapple with a meme-stock new normal",
                src: "https://www.bnnbloomberg.ca/wall-street-and-c-suite-grapple-with-a-meme-stock-new-normal-1.1621926",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "Financial Post",
        articles: [
            {
                title: "How to test-drive your mortgage before you get stuck with a home you can't afford",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "This couple needs to turbocharge their TFSAs to make up for the financial loss from COVID-19",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "Financial Times",
        articles: [
            {
                title: "FT 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "FT 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "The Economist",
        articles: [
            {
                title: "TE 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "TE 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "The Global and Mail",
        articles: [
            {
                title: "TGAM 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "TGAM 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "The New York Times",
        articles: [
            {
                title: "TNYT 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "TNYT 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "The Wall Street Journal",
        articles: [
            {
                title: "TWSJ 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "TWSJ 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    },
    {
        name: "Time",
        articles: [
            {
                title: "T 1",
                src: "https://financialpost.com/personal-finance/how-to-test-drive-your-mortgage-before-you-get-stuck-with-a-home-you-cant-afford",
                date: "2021-06-26"
            },
            {
                title: "T 2",
                src: "https://financialpost.com/personal-finance/family-finance/this-couple-needs-to-turbocharge-their-tfsas-to-make-up-for-the-financial-loss-from-covid-19",
                date: "2021-06-26"
            }
        ]
    }
]


const defaultNews = {
    company_name: "",
    news: []
}

const stockNews = [
    {
        company_name: "Tesla",
        ticker: "TSLA",
        news: [
            {
                id: 1,
                title: "Biden's EV charging push boosts established automakers taking on Tesla",
                src: "https://ca.finance.yahoo.com/news/bidens-ev-charging-push-boosts-163555634.html"
            },
            {
                id: 2,
                title: "The Tesla of Farming? -- Should You Buy John Deere Stock Now?",
                src: "https://www.fool.com/investing/2021/06/25/the-tesla-of-farming-should-you-buy-john-deere-sto/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article"
            }
        ]
    },
    {
        company_name: "AMC",
        ticker: "AMC",
        news: [
            {
                id: 1,
                title: "Why AMC Stock Dropped Friday",
                src: "https://ca.finance.yahoo.com/m/d302f5ac-7c42-3a1c-b14d-501a32265524/why-amc-stock-dropped-friday.html"
            },
            {
                id: 2,
                title: "3 Good Reasons to Buy a Stock -- and 1 Very Bad Reason",
                src: "https://www.fool.com/investing/2021/06/25/3-good-reasons-to-buy-a-stock-and-1-very-bad-reaso/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article"
            }
        ]
    }
]


/* GET news details. */
router.get('/news/:ticker', function (req, res) {
    const news = stockNews.filter((stock) => stock.ticker === req.params.ticker);
    res.send(news.length === 1 ? news[0] : defaultNews)
});

router.get('/allNewsSources', function (req, res) {
    res.send(newsSources)
});

router.get('/allNewsInfo', function (req, res) {
    res.send(newsInfo)
});


module.exports = router;