# [InvestoBull][investobull] – A Stock Price Prediction WebApp

## 1. Project Description

Investobull is a web app designed for everyday investors who struggle with the intricacies of the stock market. This app not only provides insights into the fundamentals of blue chip stocks in the Nasdaq alongside relevant news articles, but also provides stock price predictions powered by an ensemble of delicately tuned machine learning algorithms, to help investors make informed decisions. We do the heavy lifting so that our investors can enjoy their new-found financial freedom.

**Quick links: [Quick Start Guide][guide] | [Swagger API Documentation][swagger]**

### Tech Stack

[React](https://reactjs.org/) | [ChakraUI](https://chakra-ui.com/) | [Axios](https://axios-http.com/) | [Node](https://nodejs.org/) | [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/) | [Firebase][firebase] | [Stripe][stripe] | [Azure ML](https://azure.microsoft.com/en-ca/services/machine-learning/) | [Swagger](https://swagger.io/)

### Contents

-   [1. Project Description](#1-project-description)
-   [2. Requirements and Goals](#2-requirements-and-goals)
-   [3. Integration of Tech](#3-integration-of-tech)
-   [4. Above and Beyond](#4-above-and-beyond)
-   [5. Next Steps](#5-next-steps)
-   [6. Contributions](#6-contributions)

<br/>

---

## 2. Requirements and Goals

### Minimal Requirements

-   ✅ Fully functional webapp that integrates all technologies learned throughout the course
-   ✅ Home page with a table containing at least 10 stocks
-   ✅ Retrieve stock details through an API and store stock data on MongoDB
-   ✅ Display fundamentals for each stock - market cap, earning etc.
-   ✅ Stock price predictions using historical data as our MVP
-   ✅ News page that shows articles relevant to the financial market
-   ✅ Deploying the webapp on Vercel

### Standard Goals

-   User Accounts
    -   ✅ Secure authentication with email and Google, ability to reset password
    -   ✅ Persistent watchlist for each user
    -   ✅ Watchlist-specific news in the News page
    -   ✅ In-app notification system
    -   ✅ Different tiers of subscription plans
    -   ✅ Secure credit card payment through Stripe
-   Stock Details
    -   ✅ Render an interactive graph using historical price fluctuation
    -   ✅ Display relevant news for each stock
    -   ⚠️ Breakdown of all variables used for future price predictions
-   User Interface
    -   ✅ Clean and consistent UI with high readability
    -   ✅ Responsive UI that is mobile ready

### Stretch Goals

-   Real-time Data
    -   ✅ Setup cron jobs on GitHub Actions to retrieve and update the MongoDB database with real-time stock data such as latest price and volume
    -   ✅ Utilize cron jobs to fetch the latest news articles from [news API][newsapi]
-   User Experience
    -   ✅ Light and Dark mode to improve accessibility
    -   ✅ Loading spinners and responsive buttons to indicate interactive components
    -   ✅ Perform User Acceptance Testing with potential users/customers, and improve user flow based on feedback
-   Stock Price Predictions
    -   ✅ Integrate AutoML to deploy models as endpoints
    -   ✅ Have predictions set up for more than 10 stocks
    -   ⚠️ Graph detailed metrics related to each stock
    -   ⚠️ Set up in-app notifications to alert users on price fluctuations
    -   ❌ Send emails to alert users on important updates
    -   ❌ Analyze technical factors like moving averages, etc. for prediction and validation metrics
    -   ❌ Display public reports from analyzers
-   Documentation
    -   ✅ [Quick Start Guide][guide]
    -   ✅ [Document API endpoints on Swagger][swagger]

<br/>

---

## 3. Integration of Tech

### Unit 1 - HTML, CSS, JS

-   Used Chakra UI: a CSS framework, and styled using inline CSS
-   Built a Responsive UI for mobile view

### Unit 2 - React

-   Used React to build reusable components to set up the website
    -   These components helped minimize repetition and maximize reusability
    -   The virtual dom structure significantly reduces page load times
-   Used Context API to track state
    -   Eliminates the need for passing state as props
    -   Reduces boiler plate code compared to Redux
-   Used custom hooks for abstract site functionality
    -   Create reusable functions and avoid code duplication
-   Use Stripe Elements integration to handle credit card payments
    -   Eliminates the need to handle critical credit card data
-   Used React-firebase integration for authentication and storing user data
    -   Eliminates the need for building a custom OAuth solution
    -   Enhances security of the overall application
    -   onSnapshot event listener makes it easy to update React state when the firestore database is updated

### Unit 3 - Node & Express

### Unit 4 - NoSQL with MongoDB

### Unit 5 - Release Engineering

<br/>

---

## 4. Above and Beyond

### Microsoft Azure AutoML

### 3rd Party Services

#### [Firebase][firebase]

-   [Firebase Authentication](https://firebase.google.com/products/auth)
    -   A simple yet secure way of setting up OAuth
    -   Seamless integration for email + Google Account login/signup
-   [Cloud Firestore](https://firebase.google.com/products/firestore)
    -   Storing user data – name, subscription plan, watchlist, notifications, etc.
    -   Removes the need to move user data out of Firebase
    -   Inbuilt Listeners like onSnapshot update the state of the website in real time when changes are made to a collection

#### [Stripe][stripe]

-   Process Credit Card payments
-   Reduces security concerns by eliminating the need to store credit card information
-   Easy integration into the website using stripe elements

#### [NewsAPI][newsapi]

-   Used NewsApi to fetch real-time news data corresponding not only to individual stocks but also to different news sources

#### [Alpha Vantage API][alpha-vantage]

-   Used the Alpha Vantage API to fetch real-time data for different stocks

### User Acceptance Testing (UAT)

-   Performed UAT with 20+ potential users
-   Addressed UI / UX concerns - color scheme, setting up light/dark mode etc.

### Future-proofing

#### MongoDB structure

-   The database has been designed to handle new markets like TSX and NYSE if we decide to scale up in the future

### Documentation

#### [Quick Start Guide][guide]

-   Helps new users navigate through the webapp

#### [Swagger API Documentation][swagger]

-   Clean way to test our API endpoints
-   Convenient way to document endpoints for use by teammates
-   Easy interface to interact with APIs

<br/>

---

## 5. Next Steps

<br/>

---

## 6. Contributions

#### Himanshu Goyal

#### Paul Freiwirth

#### Raghav Thakur

#### Weiyoung Tan

<br/>

[investobull]: https://investobull.vercel.app/
[guide]: https://docs.google.com/document/d/1lpJtf07Uv22bCiGY2IghgsdkWpxphbpEnlNmjR_iexU/edit?usp=sharing
[swagger]: https://app.swaggerhub.com/apis-docs/InvestobullInvestors/InvestobullInvestors/1.0.0
[firebase]: https://firebase.google.com/
[stripe]: https://stripe.com/
[newsapi]: https://newsapi.org/
[alpha-vantage]: https://www.alphavantage.co/
