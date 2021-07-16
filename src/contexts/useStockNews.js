import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const StockNewsContext = createContext({});

const StockNewsProvider = ({ children }) => {
  const [stockNews, setStockNews] = useState([]);
  const [newsSelections, setNewsSelections] = useState([]);
  const [newsMasterlist, setNewsMasterlist] = useState([]);

  const setNews = (stockSymbol) => {
    axios
      .get(`http://localhost:3000/stock-news/news/${stockSymbol}`)
      .then((response) => {
        setStockNews(response.data.news);
      });
  };

  const setNewsSelections2 = () => {
    axios
      .get(`http://localhost:3000/stock-news/newsSelections`)
      .then((response) => {
        setNewsSelections(response.data);
      });
  };

  const setNewsMasterlist2 = () => {
    axios
      .get("http://localhost:3000/stock-news/newsMasterlist")
      .then((response) => {
        setNewsMasterlist(response.data);
      });
  };

  const reorderNews = (sources) => {
    axios
      .post(`http://localhost:3000/stock-news/reorderNews`, { sources })
      .then((response) => {
        setNewsSelections(response.data);
      });
  };

  const selectSource = (source) => {
    axios
      .post(`http://localhost:3000/stock-news/selectSource`, { source })
      .then((response) => {
        setNewsSelections(response.data);
      });
  };

  const selectAllSources = () => {
    axios
      .post(`http://localhost:3000/stock-news/selectAllSources`)
      .then((response) => {
        setNewsSelections(response.data);
      });
  };

  const unselectAllSources = () => {
    axios
      .post(`http://localhost:3000/stock-news/unselectAllSources`)
      .then((response) => {
        setNewsSelections(response.data);
      });
  };

  return (
    <StockNewsContext.Provider
      value={{
        stockNews,
        newsSelections,
        newsMasterlist,
        setNewsSelections2,
        setNewsMasterlist2,
        setNews,
        reorderNews,
        selectSource,
        selectAllSources,
        unselectAllSources,
      }}
    >
      {children}
    </StockNewsContext.Provider>
  );
};

export const useStockNews = () => useContext(StockNewsContext);

export default StockNewsProvider;
