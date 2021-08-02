import { Route } from "react-router-dom";
import React from "react";
import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Plans from "../pages/Plans";
import StockInfo from "../pages/StockInfo";
import Watchlist from "../pages/Watchlist";

const Main = () => {
    return (
        <>
            <Route path="/" exact component={Home} /> {/*Raghav*/}
            <Route path="/watchlist" component={Watchlist} /> {/*Weiyoung*/}
            <Route path="/plans" component={Plans} /> {/*Himanshu*/}
            <Route path="/about" component={About} /> {/*Weiyoung*/}
            <Route path="/news" component={News} /> {/*Paul*/}
            {/*<Route path="/help" component={Help}/> /!*Himanshu*!/*/}
            <Route path="/stock-info/:tickerId" component={StockInfo} />
            {/*<Route component={() => <Redirect to="/home"/>}/>*/}
        </>
    );
};

export default Main;
