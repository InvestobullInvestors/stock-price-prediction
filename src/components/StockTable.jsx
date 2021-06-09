import { useState } from 'react';
import './StockTable.css'

const StockTable = () => {
    const [stocks, setStocks] = useState([
        {
            symbol: "BB",
            lastPrice: 15.16,
            change: -0.64,
            changePercent: "-4.05%",
            currency: "USD",
            volume: "110M",
            sharesOwned: 0,
            avgVol: "35M",
            marketCap: "8.58M",
        },
        {
            symbol: "AMC",
            lastPrice: 49.34,
            change: -5.71,
            changePercent: "-10.37%",
            currency: "USD",
            volume: "138M",
            sharesOwned: 0,
            avgVol: "141M",
            marketCap: "25.33M",
        }
    ]);

    const tableData = () => {
        stocks.map((stock, index) => {
            return (
                <tr key={stock.symbol}>
                    <td>{stock.symbol}</td>
                    <td>{stock.lastPrice}</td>
                    <td>{stock.change}</td>
                    <td>{stock.changePercent}</td>
                    <td>{stock.currency}</td>
                    <td>{stock.volume}</td>
                    <td>{stock.sharesOwned}</td>
                    <td>{stock.avgVol}</td>
                    <td>{stock.marketCap}</td>
                </tr>
            )
        })
    }

    const tableHeader = () => {
        let header = Object.keys(stocks[0])

        return header.map((key, index) => {
            return <th key={index}>
                {key.toLocaleUpperCase()}
            </th>
        })
    }

    return (
        <div>
            <h1 id='title'>Stock Table</h1>
            <table id='stocks'>
                <tbody>
                    <tr>{tableHeader()}</tr>
                    {
                        stocks.map((stock, index) => (
                            <tr key={stock.symbol}>
                                <td>{stock.symbol}</td>
                                <td>{stock.lastPrice}</td>
                                <td>{stock.change}</td>
                                <td>{stock.changePercent}</td>
                                <td>{stock.currency}</td>
                                <td>{stock.volume}</td>
                                <td>{stock.sharesOwned}</td>
                                <td>{stock.avgVol}</td>
                                <td>{stock.marketCap}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StockTable;
