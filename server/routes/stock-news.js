var express = require("express");
const { stockNewsInfo } = require("../dal/stock-markets");

var router = express.Router();
const { newsMasterlist } = require("../dal/stock-news");

// let newsSelections = [
//   {
//     id: "0",
//     name: "Bloomberg",
//     selected: true,
//   },
//   {
//     id: "1",
//     name: "Financial Post",
//     selected: true,
//   },
//   {
//     id: "2",
//     name: "Financial Times",
//     selected: true,
//   },
//   {
//     id: "3",
//     name: "The Economist",
//     selected: true,
//   },
//   {
//     id: "4",
//     name: "The Global and Mail",
//     selected: true,
//   },
//   {
//     id: "5",
//     name: "The New York Times",
//     selected: true,
//   },
//   {
//     id: "6",
//     name: "The Wall Street Journal",
//     selected: true,
//   },
//   {
//     id: "7",
//     name: "Time",
//     selected: true,
//   },
// ];
//
// let newsMasterlist = [
//   {
//     id: "0",
//     name: "Bloomberg",
//     articles: [
//       {
//         title:
//           "Bitcoin Slips Toward $30,000 as Strategists Flag Near-Term Risks",
//         src:
//           "https://www.bloomberg.com/news/articles/2021-06-26/bitcoin-slips-toward-30-000-as-strategists-flag-near-term-risks?srnd=markets-vp",
//         date: "2021-06-26",
//       },
//       {
//         title: "GameStop Moves to Russell 1000; AMC Stays in Small-Cap Index",
//         src:
//           "https://www.bloomberg.com/news/articles/2021-06-25/gamestop-graduates-to-russell-1000-amc-stays-in-small-cap-index?srnd=markets-vp",
//         date: "2021-06-25",
//       },
//     ],
//   },
//   {
//     id: "1",
//     name: "Financial Post",
//     articles: [
//       {
//         title:
//           "David Rosenberg: The best way to invest in China's new five-year plan",
//         src:
//           "https://financialpost.com/investing/david-rosenberg-the-best-way-to-invest-in-chinas-new-five-year-plan",
//         date: "2021-06-25",
//       },
//       {
//         title:
//           "We need to remember that smart retirement is about everything other than money",
//         src:
//           "https://financialpost.com/investing/we-need-to-remember-that-smart-retirement-is-about-everything-other-than-money",
//         date: "2021-06-25",
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Financial Times",
//     articles: [
//       {
//         title:
//           "Investors pile $54bn in to ESG bond funds in fiery start to 2021",
//         src: "https://www.ft.com/content/af62e245-a136-40c1-b53d-89795b507d45",
//         date: "2021-06-25",
//       },
//       {
//         title:
//           "Wall Street notches best week since February after Biden infrastructure deal",
//         src: "https://www.ft.com/content/2b07f1d2-42a5-4fd6-9fe1-441487213a36",
//         date: "2021-06-25",
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "The Economist",
//     articles: [
//       {
//         title: "Big miners’ capital discipline is good news for investors",
//         src:
//           "https://www.economist.com/business/2021/06/26/big-miners-capital-discipline-is-good-news-for-investors",
//         date: "2021-06-26",
//       },
//       {
//         title: "A new phase in the financial cycle",
//         src:
//           "https://www.economist.com/finance-and-economics/2021/06/24/a-new-phase-in-the-financial-cycle",
//         date: "2021-06-24",
//       },
//     ],
//   },
//   {
//     id: "4",
//     name: "The Global and Mail",
//     articles: [
//       {
//         title:
//           "Short sales on the TSX: What bearish investors are betting against",
//         src:
//           "https://www.theglobeandmail.com/investing/markets/inside-the-market/article-short-sales-on-the-tsx-what-bearish-investors-are-betting-against-35/",
//         date: "2021-06-25",
//       },
//       {
//         title: "BMO CEO predicts economic boom as COVID-19 pandemic wanes",
//         src:
//           "https://www.theglobeandmail.com/business/article-bmo-ceo-predicts-economic-boom-as-covid-19-pandemic-wanes/",
//         date: "2021-06-25",
//       },
//     ],
//   },
//   {
//     id: "5",
//     name: "The New York Times",
//     articles: [
//       {
//         title:
//           "Ousting Toshiba Chairman, Foreign Investors Score Breakthrough in Japan",
//         src:
//           "https://www.nytimes.com/2021/06/25/business/japan-toshiba-chair.html",
//         date: "2021-06-25",
//       },
//       {
//         title:
//           "Top U.S. Officials Consulted With BlackRock as Markets Melted Down",
//         src:
//           "https://www.nytimes.com/2021/06/24/business/economy/fed-blackrock-pandemic-crisis.html",
//         date: "2021-06-24",
//       },
//     ],
//   },
//   {
//     id: "6",
//     name: "The Wall Street Journal",
//     articles: [
//       {
//         title: "S&P 500 Closes Higher to Extend Weekly Gains",
//         src:
//           "https://www.wsj.com/articles/global-stock-markets-dow-update-06-25-21-11624606680?mod=markets_lead_pos1",
//         date: "2021-06-25",
//       },
//       {
//         title: "Saving for Retirement? Now You Can Bet on Bitcoin.",
//         src:
//           "https://www.wsj.com/articles/saving-for-retirement-now-you-can-bet-on-bitcoin-11624613435?mod=markets_lead_pos7",
//         date: "2021-06-25",
//       },
//     ],
//   },
//   {
//     id: "7",
//     name: "Time",
//     articles: [
//       {
//         title:
//           "The Devastated Cruise Industry Celebrates as the First Cruise Prepares to Set Sail From U.S. Since the Pandemic",
//         src: "https://time.com/6075938/first-cruise-ship-sail-covid19",
//         date: "2021-06-25",
//       },
//       {
//         title:
//           "'Someone's Going to Be Left Holding the Bag.' How Finance TikTok Is Navigating 'Meme Stock' Hype Among Young Investors",
//         src: "https://time.com/6073524/meme-stock-tiktok/",
//         date: "2021-06-24",
//       },
//     ],
//   },
// ];

const defaultNews = {
  company_name: "",
  news: [],
};

/* GET news details. */
router.get("/news/:ticker", function (req, res) {
  const { ticker } = req.params;
  stockNewsInfo
    .findOne({ ticker_id: ticker })
    .then(({ stock_name, stock_news }) => {
      res.send({ company_name: stock_name, news: stock_news.slice(0, 5) });
    })
    .catch((error) => {
      console.log(error.message);
      res.send(defaultNews);
    });
});

const stockNews = [
  {
    company_name: "Tesla",
    ticker: "TSLA",
    news: [
      {
        id: 1,
        title:
          "Biden's EV charging push boosts established automakers taking on Tesla",
        src:
          "https://ca.finance.yahoo.com/news/bidens-ev-charging-push-boosts-163555634.html",
      },
      {
        id: 2,
        title: "The Tesla of Farming? -- Should You Buy John Deere Stock Now?",
        src:
          "https://www.fool.com/investing/2021/06/25/the-tesla-of-farming-should-you-buy-john-deere-sto/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article",
      },
    ],
  },
  {
    company_name: "AMC",
    ticker: "AMC",
    news: [
      {
        id: 1,
        title: "Why AMC Stock Dropped Friday",
        src:
          "https://ca.finance.yahoo.com/m/d302f5ac-7c42-3a1c-b14d-501a32265524/why-amc-stock-dropped-friday.html",
      },
      {
        id: 2,
        title: "3 Good Reasons to Buy a Stock -- and 1 Very Bad Reason",
        src:
          "https://www.fool.com/investing/2021/06/25/3-good-reasons-to-buy-a-stock-and-1-very-bad-reaso/?source=eptyholnk0000202&utm_source=yahoo-host&utm_medium=feed&utm_campaign=article",
      },
    ],
  },
];

router.get("/newsSelections", function (req, res) {
  res.send(newsSelections);
});

router.get("/newsMasterlist", function (req, res) {
  res.send(newsMasterlist);
});

router.post("/reorderNews", function (req, res) {
  const { sources } = req.body;
  newsSelections = sources;
  res.send(newsSelections);
});

router.post("/selectSource", function (req, res) {
  const { source } = req.body;
  let selectedSource = newsSelections.find(
    (currSource) => currSource.id === source.id
  );
  selectedSource.selected = !selectedSource.selected;
  res.send(newsSelections);
});

router.post("/selectAllSources", function (req, res) {
  newsSelections = newsSelections.map(({ selected, ...rest }) => ({
    ...rest,
    selected: true,
  }));
  res.send(newsSelections);
});

router.post("/unselectAllSources", function (req, res) {
  newsSelections = newsSelections.map(({ selected, ...rest }) => ({
    ...rest,
    selected: false,
  }));
  res.send(newsSelections);
});

module.exports = router;
