import { Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import About from '../pages/About';
import Home from '../pages/Home';
import News from '../pages/News';
import Plans from '../pages/Plans';
import StockInfo from '../pages/StockInfo';
import Watchlist from '../pages/Watchlist';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const Main = () => (
    <>
        <ScrollToTop />
        <Route path="/" exact component={Home} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/plans" component={Plans} />
        <Route path="/about" component={About} />
        <Route path="/news" component={News} />
        <Route path="/stock-info/:tickerId" component={StockInfo} />
    </>
);

export default Main;
