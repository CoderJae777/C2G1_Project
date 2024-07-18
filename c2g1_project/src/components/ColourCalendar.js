import React, { useState, useEffect } from 'react';
import '../styles/colourcalendar.css';
import 'boxicons/css/boxicons.min.css';

const ColourCalendar = ({ workshopDates }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    useEffect(() => {
        renderCalendar();
    }, [currYear, currMonth]);

    const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = [];

    const getclassNames = (i) => {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                        && currYear === new Date().getFullYear() ? "active" : "";
        const formattedDay = `${currYear}-${("0" + (currMonth + 1)).slice(-2)}-${("0" + i).slice(-2)}`;
        // Check if the formatted day exists in workshopDates array
        let isWorkshopDay = workshopDates.includes(formattedDay) ? "workshop-day" : "";
        // Add more for diff categories
        let classNames = `${isToday} ${isWorkshopDay}`.trim();
        return classNames
    }

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag.push(<li className="inactive" key={`prev${i}`}>{lastDateofLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let classNames = getclassNames(i);
        liTag.push(<li className={classNames} key={`curr${i}`}>{i}</li>);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag.push(<li className="inactive" key={`next${i}`}>{i - lastDayofMonth + 1}</li>);
    }

    setDays(liTag);
    };

    const handlePrevNext = (direction) => {
        if (direction === "prev") {
            let newMonth = currMonth - 1;
            let newYear = currYear;
            if (newMonth < 0) {
                newMonth = 11;
                newYear = currYear - 1;
            }
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        } else if (direction === "next") {
            let newMonth = currMonth + 1;
            let newYear = currYear;
            if (newMonth > 11) {
                newMonth = 0;
                newYear = currYear + 1;
            }
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        }
    };

    return (
    <div data-cy="colour-calendar-popup" className="colour-calendar-popup">
    <header>
        <div className="icons">
            {/* <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNext("prev")}>chevron_left</span>
            <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNext("next")}>chevron_right</span> */}
            <span id="prev" className="arrow-left">
                <div className="fa-solid fa-chevron-left" onClick={() => handlePrevNext("prev")}>
                    <box-icon name='chevron-left'></box-icon>
                </div>
            </span>
            <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
            <span id="next" className="arrow-right" onClick={() => handlePrevNext("next")}>
                <div className="fa-solid fa-chevron-right">
                    <box-icon name='chevron-right'></box-icon>
                </div>
            </span>
        </div>
    </header>
    <div className="calendar-container">       
        <div className="calendar">
            <ul className="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            </ul>
            <ul className="days">{days}</ul>
        </div>
    </div>
    </div>
    );
};

export default ColourCalendar;
