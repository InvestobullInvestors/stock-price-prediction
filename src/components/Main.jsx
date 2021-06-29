import {Route} from 'react-router-dom';
import React from 'react';
import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Payments from "../pages/Payments";
import StockDetails from "../pages/StockDetails";
import Watchlist from "../pages/Watchlist";

const Main = () => {

    return (
        <>
            <Route path="/" exact component={Home}/> {/*Raghav*/}
            <Route path="/watchlist" component={Watchlist}/> {/*Weiyoung*/}
            <Route path="/plans" component={Payments}/> {/*Himanshu*/}
            <Route path="/about" component={About}/> {/*Weiyoung*/}
            <Route path="/news" component={News}/> {/*Paul*/}
            {/*<Route path="/help" component={Help}/> /!*Himanshu*!/*/}
            <Route path="/stock-details/:tickerId" component={StockDetails}/>
            {/*<Route component={() => <Redirect to="/home"/>}/>*/}
        </>
    )
}

export default Main;
