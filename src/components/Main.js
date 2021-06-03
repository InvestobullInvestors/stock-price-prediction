import {Redirect, Route} from 'react-router-dom';
import React, {Component} from 'react';

class Main extends Component {
    render() {
        return (
            <div>
                <Header/> {/*Weiyoung*/}
                <switch>
                    <Route path="/home" component={Home}/> {/*Raghav*/}
                    <Route path="/watchlist" component={WatchList}/> {/*Weiyoung*/}
                    <Route path="/plans" component={Plans}/> {/*Himanshu*/}
                    <Route path="/about" component={About}/> {/*Paul*/}
                    <Route path="/news" component={News}/> {/*Paul*/}
                    <Route path="/help" component={Help}/> {/*Himanshu*/}
                    <Route path="/stock-detail/:tickerId" component={StockDetail}/> {/*TODO*/}
                    <Redirect to="/home"/>
                </switch>
                <Footer/> {/*Weiyoung*/}
            </div>
        )
    }
}

export default Main;
