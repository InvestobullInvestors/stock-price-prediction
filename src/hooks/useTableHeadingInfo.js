const useTableHeadingInfo = () => [
    {
        name: '',
        width: '4%',
        hover: { cursor: 'default' },
    },
    {
        name: 'Ticker',
        hover: { cursor: 'default' },
    },
    {
        name: 'Dividend Payout Ratio',
        id: 'dividendPayoutRatio',
        column_name: 'dividend_payout_ratio',
        display: { base: 'none', md: 'table-cell' },
    },
    {
        name: 'PE Ratio',
        id: 'peRatio',
        column_name: 'pe_ratio',
        display: { base: 'none', md: 'table-cell' },
    },
    {
        name: 'PEG Ratio',
        id: 'pegRatio',
        column_name: 'peg_ratio',
        display: { base: 'none', md: 'table-cell' },
    },
    {
        name: 'Quarterly Earning Growth',
        id: 'quarterlyEarningGrowth',
        column_name: 'quarterly_earning_growth',
        display: { base: 'none', lg: 'table-cell' },
    },
    {
        name: 'Quarterly Revenue Growth',
        id: 'quarterlyRevenueGrowth',
        column_name: 'quarterly_revenue_growth',
        display: { base: 'none', lg: 'table-cell' },
    },
    {
        name: '52-Week Low',
        column_name: 'fifty_two_week_low',
        id: 'fiftyTwoWeekLow',
    },
    {
        name: '52-Week High',
        column_name: 'fifty_two_week_high',
        id: 'fiftyTwoWeekHigh',
    },
];

export default useTableHeadingInfo;
