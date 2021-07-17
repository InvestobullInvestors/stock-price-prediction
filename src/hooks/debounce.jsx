import React, {useEffect, useState} from 'react';

const useDebounce = (value, timeout, callback) => {
        const [timer, setTimer] = useState(null);

        const clearTimer = () => {
            if (timer) {
                clearTimeout();
            }
        };

        useEffect(() => {
            clearTimer();

            if (value && callback) {
                const newTimer = setTimeout(callback, timeout);
                setTimer(newTimer);
            }
        }, [value]);
    }
;

export default useDebounce;
