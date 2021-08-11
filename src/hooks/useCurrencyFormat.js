const useCurrencyFormat = () => (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(amount);
};

export default useCurrencyFormat;
