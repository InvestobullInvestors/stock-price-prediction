# [InvestoBull][investobull] – A Stock Price Prediction WebApp

## 1. Project Description

Investobull is a web app designed for everyday investors who struggle with the intricacies of the stock market. This app not only provides insights into the fundamentals of blue chip stocks in the Nasdaq alongside relevant news articles, but also provides stock price predictions powered by an ensemble of delicately tuned machine learning algorithms to help investors make informed decisions. We do the heavy lifting so that our investors can enjoy their new-found financial freedom.

Quick links: [Swagger API Documentation][swagger] | [Quick Start Guide][guide]

### Tech Stack

[React](https://reactjs.org/) | [ChakraUI](https://chakra-ui.com/) | [Axios](https://axios-http.com/) | [Node](https://nodejs.org/) | [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/) | [Firebase](https://firebase.google.com/) | [Stripe](https://stripe.com/) | [Azure ML](https://azure.microsoft.com/en-ca/services/machine-learning/) | [Swagger](https://swagger.io/)

## Contents
-   [1. Project Description](#1-project-description)
-   [2. Requirements and Goals](#2-requirements-and-goals)
-   [3. Integration of Tech](#3-integration-of-tech)
-   [4. Above and Beyond](#4-above-and-beyond)
-   [5. Next Steps](#5-next-steps)
-   [6. Contributions](#6-contributions)

<br/>

## 2. Requirements and Goals

### Minimal Requirements
-   ✅ Fully functional webapp using all technologies learned throughout the course - CSS, React, Node, Express, MongoDB, hosting & CI/CD
-   ✅ Landing page with a table of at least 10 stocks
-   ✅ Stock price predictions using historical data as our MVP
-   ✅ News page showing articles relevant to the financial market
-   ✅ Deploying the site on Vercel

### Standard Goals
-   User Accounts
    -   ✅ Secure authentication with email and Google, ability to reset password
    -   ✅ Persistent watchlist for each user
    -   ✅ Watchlist-specific news in the News page
    -   ✅ Different plans to subscribe to with different perks
    -   ✅ Secure credit card payment through Stripe
    -   ✅ Notifications system
-   Stock Details
    -   ✅ Retrieve stock details through an [API][newsapi] and store stock data on MongoDB Atlas
    -   ✅ Display fundamentals for each stock - market cap, earning etc.
    -   ✅ Render an interactive graph with historical price fluctuation
    -   ✅ Display relevant news for each stock
    -   ⚠️ Breakdown of all variables used for future price predictions
-   User Experience
    -   ✅ Clean and consistent UI with great readability
    -   ✅ Light and Dark mode to improve accessibility
    -   ✅ Responsive UI that is mobile ready

### Stretch Goals
-   Real-time Data
    -   ✅ Setup cron jobs on GitHub Actions to retrieve and update MongoDB database with real-time stock data such as latest price and volume
    -   ✅ Utilize cron jobs to fetch latest news articles
-   User Experience
    -   ✅ Perform UAT tests with potential users/customers, and improve user flow based on feedback
    -   ✅ Loading spinners and responsive buttons to indicate interactive components
-   Stock Price Predictions
    -   ✅ Have predictions set up for more than 10 stocks
    -   ✅ Integrate AutoML to deploy models as endpoints
    -   ⚠️ Graph detailed metrics related to each stock
    -   ⚠️ Set up in app notifications to alert users on price fluctuations
    -   ❌ Send emails to alert users on important updates
    -   ❌ Analyze technical factors like moving averages, etc. for prediction and validation metrics
    -   ❌ Display public reports from analyzers
-   Documentation
    -   ✅ [Quick Start Guide][guide]
    -   ✅ [Document API endpoints on Swagger][swagger]
    
<br/>

## 3. Integration of Tech

### Unit 1 - HTML, CSS, JS

### Unit 2 - React

### Unit 3 - Node & Express

### Unit 4 - NoSQL with MongoDB

### Unit 5 - Release Engineering

<br/>

## 4. Above and Beyond

<br/>

## 5. Next Steps

<br/>

## 6. Contributions

#### Himanshu Goyal

#### Paul Freiwirth

#### Raghav Thakur

#### Weiyoung Tan

<br/>

[investobull]: https://investobull.vercel.app/
[guide]: https://docs.google.com/document/d/1lpJtf07Uv22bCiGY2IghgsdkWpxphbpEnlNmjR_iexU/edit?usp=sharing
[swagger]: https://app.swaggerhub.com/apis-docs/InvestobullInvestors/InvestobullInvestors/1.0.0
[newsapi]: https://newsapi.org/
