import { useEffect, useState } from 'react';

function DateAndTime() {
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        setDateTime(getCurrentDateTime());
        const intervalId = setInterval(() => {
            setDateTime(getCurrentDateTime());
        }, 1000); // Update every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    function getCurrentDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };
        return now.toLocaleDateString('en-US', options);
    }

    return (
        <div className="date-and-time">
            {dateTime}
        </div>
    );
}

export default DateAndTime;
