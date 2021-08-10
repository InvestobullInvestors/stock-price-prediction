const useDateFormat = () => (date) => {
    if (date) {
        const dateObj = new Date(date.split('T')[0]);
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return dateObj.toLocaleDateString('en-US', options);
    } else {
        return null;
    }
};

export default useDateFormat;
