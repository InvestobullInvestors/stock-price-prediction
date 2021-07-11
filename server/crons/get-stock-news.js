const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('11f5890322714a4892c2b164660fbd4a');





// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
    // sources: 'bbc-news,the-verge',
    q: 'Tesla',
    // category: 'business',
    language: 'en',
    // country: 'us'
}).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
});



// To query /v2/everything
// You must include at least one q, source, or domain
// newsapi.v2.everything({
//     q: 'bitcoin',
//     sources: 'bbc-news,the-verge',
//     domains: 'bbc.co.uk, techcrunch.com',
//     from: '2021-06-12',
//     to: '2021-07-06',
//     language: 'en',
//     sortBy: 'relevancy',
//     page: 2
// }).then(response => {
//     console.log(response);
//     /*
//       {
//         status: "ok",
//         articles: [...]
//       }
//     */
// });

//
//
// To query sources
// All options are optional
// newsapi.v2.sources({
//     category: 'technology',
//     language: 'en',
//     country: 'us'
// }).then(response => {
//     console.log(response);
//     /*
//       {
//         status: "ok",
//         sources: [...]
//       }
//     */
// });