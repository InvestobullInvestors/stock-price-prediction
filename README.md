# stock-price-prediction

## Project Description
This web app will be used by everyday investors who have a limited understanding of the technical and fundamental factors affecting blue chip stock prices. Our system will provide detailed insights into commonly used analysis models—such as discounted cash flow (DCF)in order to predict a stock's future price. We will differentiate our service from competitors’ offerings by providing users with transparents metrics that explain how we derive our projections. Our goal is to help users make better-informed decisions with their investments.

We will store user login credentials, user watch lists, and historical stock data in our databases. Users will have access to processed data generated by running mathematical models over the raw data that is stored in the database. If time permits, we aim to make these models more sophisticated.

## Project Task Requirements

### Tech Stack
- React
- NodeJS (TypeScript/JavaScript)
- AWS Cloud
- Firebase for user authentication
- Stripe for handling payments

### Minimal Requirements
- fully functioning web app using technologies learned throughout the course such as html, css, js, react, nodejs, mongo db, etc.
- predicting stock prices using historical data as mvp if short on time
- show opening and closing of stock prices
- chart of total volume traded on a day
- chart showing ratio of bid vs. ask for stock
- show most important statistic of each stock

### Standard Requirements
- user login and profiles
- secure authentication
- ability to follow certain stocks
- receive alerts built-in to the app, to notify if followed stocks have gone up or down by a certain percentage
- ability to open each stock and view more details on how the predicted price was calculated
- ability to compare stocks using a side-by-side split view
- show market cap of companies/earnings

### Stretch Requirements
- real-time updates for each stock, i.e., price
- integrate AutoML or Machine Learning API to predict price of stock
- email or text notifications
- allow users to switch between light and dark theme for the web app
- initial theme will be dark only
- prices before/after stock splits
- show/look at 100/200 day moving averages for prediction or validation
- analyze or show charting patterns of stocks
- show/look at dividend payouts
- links/view to industry related news for the stock in interest
- links/view public reports from analyzers

## Task breakdown 
- Show opening and closing of stock prices
- Get data for the required ticker symbol from an API (probably Yahoo finance)
- Store this data onto a database 
- Create an API to deliver that data to the frontend 
- Display the data to the end user
- Plans page to subscribe to plans 
- Create a list of plans that one can subscribe to 
- Set up a customer on Stripe 
- Save the Stripe customer id corresponding to a customer in the database 
- Build the payments UI using Stripe Elements 
- Save Credit Cards on Stripe
