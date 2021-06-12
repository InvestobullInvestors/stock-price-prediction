import {Route} from 'react-router-dom';
import React, {Component} from 'react';
import Payments from "../pages/Payments";
import Watchlist from "../pages/Watchlist";
import News from "../pages/News";

class Main extends Component {
    render() {
        const Home = () => (
            <div>Hello</div>
        )

        return (
            <>
                <Route path="/" exact component={Home}/> {/*Raghav*/}
                <Route path="/watchlist" component={Watchlist}/> {/*Weiyoung*/}
                <Route path="/plans" component={Payments}/> {/*Himanshu*/}
                {/*<Route path="/about" component={About}/> /!*Paul*!/*/}
                <Route path="/news" component={News}/> {/*Paul*/}
                {/*<Route path="/help" component={Help}/> /!*Himanshu*!/*/}
                {/*<Route path="/stock-detail/:tickerId" component={StockDetail}/> /!*TODO*!/*/}
                {/*<Route component={() => <Redirect to="/home"/>}/>*/}
            </>
        )
    }
}

export default Main;
