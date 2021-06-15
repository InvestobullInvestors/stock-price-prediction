import {Route} from 'react-router-dom';
import React from 'react';
import Payments from "../pages/Payments";
import Home from "../pages/Home";
import Watchlist from "../pages/Watchlist";
import News from "../pages/News";
import StockDetails from "../pages/StockDetails";

const Main = () => {


    return (
        <>
            <Route path="/" exact component={Home}/> {/*Raghav*/}
            <Route path="/watchlist" component={Watchlist}/> {/*Weiyoung*/}
            <Route path="/plans" component={Payments}/> {/*Himanshu*/}
            {/*<Route path="/about" component={About}/> /!*Paul*!/*/}
            <Route path="/news" component={News}/> {/*Paul*/}
            {/*<Route path="/help" component={Help}/> /!*Himanshu*!/*/}
            <Route path="/stock-details/:tickerId" component={StockDetails}/>
            {/*<Route component={() => <Redirect to="/home"/>}/>*/}
        </>
    )
}

export default Main;
