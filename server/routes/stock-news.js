var express = require('express');
const {stockNewsInfo} = require("../dal/stock-markets");
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

/* GET news details. */
router.get('/news/:ticker', function (req, res) {
    const {ticker} = req.params
    stockNewsInfo.findOne({ticker_id: ticker}).then(({stock_name, stock_news}) => {
        res.send({company_name: stock_name, news: stock_news.slice(0, 5)})
    }).catch(error => {
        console.log(error.message)
        res.send(defaultNews)
    })
});

router.get('/allNewsSources', function (req, res) {
    res.send(newsSources)
});

router.get('/allNewsInfo', function (req, res) {
    res.send(newsInfo)
});


module.exports = router;