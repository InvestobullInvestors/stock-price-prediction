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
                title: "Bitcoin Slips Toward $30,000 as Strategists Flag Near-Term Risks",
                src: "https://www.bloomberg.com/news/articles/2021-06-26/bitcoin-slips-toward-30-000-as-strategists-flag-near-term-risks?srnd=markets-vp",
                date: "2021-06-26"
            },
            {
                title: "GameStop Moves to Russell 1000; AMC Stays in Small-Cap Index",
                src: "https://www.bloomberg.com/news/articles/2021-06-25/gamestop-graduates-to-russell-1000-amc-stays-in-small-cap-index?srnd=markets-vp",
                date: "2021-06-25"
            }
        ]
    },
    {
        name: "Financial Post",
        articles: [
            {
                title: "David Rosenberg: The best way to invest in China's new five-year plan",
                src: "https://financialpost.com/investing/david-rosenberg-the-best-way-to-invest-in-chinas-new-five-year-plan",
                date: "2021-06-25"
            },
            {
                title: "We need to remember that smart retirement is about everything other than money",
                src: "https://financialpost.com/investing/we-need-to-remember-that-smart-retirement-is-about-everything-other-than-money",
                date: "2021-06-25"
            }
        ]
    },
    {
        name: "Financial Times",
        articles: [
            {
                title: "Investors pile $54bn in to ESG bond funds in fiery start to 2021",
                src: "https://www.ft.com/content/af62e245-a136-40c1-b53d-89795b507d45",
                date: "2021-06-25"
            },
            {
                title: "Wall Street notches best week since February after Biden infrastructure deal",
                src: "https://www.ft.com/content/2b07f1d2-42a5-4fd6-9fe1-441487213a36",
                date: "2021-06-25"
            }
        ]
    },
    {
        name: "The Economist",
        articles: [
            {
                title: "Big miners’ capital discipline is good news for investors",
                src: "https://www.economist.com/business/2021/06/26/big-miners-capital-discipline-is-good-news-for-investors",
                date: "2021-06-26"
            },
            {
                title: "A new phase in the financial cycle",
                src: "https://www.economist.com/finance-and-economics/2021/06/24/a-new-phase-in-the-financial-cycle",
                date: "2021-06-24"
            }
        ]
    },
    {
        name: "The Global and Mail",
        articles: [
            {
                title: "Short sales on the TSX: What bearish investors are betting against",
                src: "https://www.theglobeandmail.com/investing/markets/inside-the-market/article-short-sales-on-the-tsx-what-bearish-investors-are-betting-against-35/",
                date: "2021-06-25"
            },
            {
                title: "BMO CEO predicts economic boom as COVID-19 pandemic wanes",
                src: "https://www.theglobeandmail.com/business/article-bmo-ceo-predicts-economic-boom-as-covid-19-pandemic-wanes/",
                date: "2021-06-25"
            }
        ]
    },
    {
        name: "The New York Times",
        articles: [
            {
                title: "Ousting Toshiba Chairman, Foreign Investors Score Breakthrough in Japan",
                src: "https://www.nytimes.com/2021/06/25/business/japan-toshiba-chair.html",
                date: "2021-06-25"
            },
            {
                title: "Top U.S. Officials Consulted With BlackRock as Markets Melted Down",
                src: "https://www.nytimes.com/2021/06/24/business/economy/fed-blackrock-pandemic-crisis.html",
                date: "2021-06-24"
            }
        ]
    },
    {
        name: "The Wall Street Journal",
        articles: [
            {
                title: "S&P 500 Closes Higher to Extend Weekly Gains",
                src: "https://www.wsj.com/articles/global-stock-markets-dow-update-06-25-21-11624606680?mod=markets_lead_pos1",
                date: "2021-06-25"
            },
            {
                title: "Saving for Retirement? Now You Can Bet on Bitcoin.",
                src: "https://www.wsj.com/articles/saving-for-retirement-now-you-can-bet-on-bitcoin-11624613435?mod=markets_lead_pos7",
                date: "2021-06-25"
            }
        ]
    },
    {
        name: "Time",
        articles: [
            {
                title: "The Devastated Cruise Industry Celebrates as the First Cruise Prepares to Set Sail From U.S. Since the Pandemic",
                src: "https://time.com/6075938/first-cruise-ship-sail-covid19",
                date: "2021-06-25"
            },
            {
                title: "'Someone's Going to Be Left Holding the Bag.' How Finance TikTok Is Navigating 'Meme Stock' Hype Among Young Investors",
                src: "https://time.com/6073524/meme-stock-tiktok/",
                date: "2021-06-24"
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