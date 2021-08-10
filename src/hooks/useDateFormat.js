const useDateFormat = () => (date) => {
    if (date) {
        let year = parseInt(date.slice(0, 4));
        let month = parseInt(date.slice(6, 7));
        let day = parseInt(date.slice(8, 10));
        let dateObj = new Date(year, month - 1, day);
        let options = { year: 'numeric', month: 'long', day: '2-digit' };

        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    } else {
        return null;
    }
};

export default useDateFormat;
