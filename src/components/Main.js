import {Route} from 'react-router-dom';
import React, {Component} from 'react';
import Payments from "../pages/Payments";

class Main extends Component {
    render() {
        const Home = () => (
            <div>Hello</div>
        )

        return (
            <>
                <Route path="/" exact component={Home}/> {/*Raghav*/}
                {/*<Route path="/watchlist" component={WatchList}/> /!*Weiyoung*!/*/}
                <Route path="/plans" component={Payments}/> {/*Himanshu*/}
                {/*<Route path="/about" component={About}/> /!*Paul*!/*/}
                {/*<Route path="/news" component={News}/> /!*Paul*!/*/}
                {/*<Route path="/help" component={Help}/> /!*Himanshu*!/*/}
                {/*<Route path="/stock-detail/:tickerId" component={StockDetail}/> /!*TODO*!/*/}
                {/*<Route component={() => <Redirect to="/home"/>}/>*/}
            </>
        )
    }
}

export default Main;
