import React, { useState, useEffect } from 'react';
import '../styles/colourcalendar.css';
import 'boxicons/css/boxicons.min.css';

const ColourCalendar = ({ workshopdata, ondateClick, trainerdata }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    const convertDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const getWorkshopByDate = (date) => {
        return workshopdata.filter(workshop => {
            const startDate = convertDate(workshop.start_date);
            const endDate = convertDate(workshop.end_date);
            return startDate === date || endDate === date
                || (new Date(workshop.start_date) <= new Date(date) && new Date(workshop.end_date) >= new Date(date));
        });
    };

    const preWorkshopDates = workshopdata.flatMap(workshop => {
        const start = new Date(workshop.start_date);
        const preStart = new Date(start);
        preStart.setDate(start.getDate() - 7);
        const dates = [];
        for (let d = preStart; d < start; d.setDate(d.getDate() + 1)) {
            dates.push(convertDate(d));
        }
        return dates;
    });

    const getTrainersOfWorkshop = (workshop) => {
        if (!workshop) return [];
        const trainerNames = workshop.trainers.map(trainerId => {
            const trainer = trainerdata.find(trainer => trainer._id === trainerId);
            return trainer ? trainer.fullname : null;
        }).filter(name => name);

        return trainerNames.join(', ');
    };

    useEffect(() => {
        renderCalendar();
    }, [currYear, currMonth, workshopdata]);

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
            let todayworkshops = getWorkshopByDate(formattedDay);
            let isWorkshopInBetween = todayworkshops.length > 0 ? "workshop-in-between" : "";
            let isMultipleWorkshops = todayworkshops.length > 1 ? "multiple-workshops" : "";

            let classNames = `${isToday} ${isWorkshopInBetween} ${isMultipleWorkshops}`.trim();
            return classNames;
    }

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag.push(
        <li className="inactive" key={`prev${i}`}>
            {lastDateofLastMonth - i + 1}
        </li>
        );
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let classNames = getclassNames(i);
        let currentdate = `${currYear}-${("0" + (currMonth + 1)).slice(-2)}-${("0" + i).slice(-2)}`;
        let workshopDetails = getWorkshopByDate(currentdate);
        liTag.push(
            <li className={classNames} key={`curr${i}`}>
                <button className='day-number' onClick={() => ondateClick(currentdate)}>{i}</button> 
                <div className='calendar-details'>
                    {workshopDetails.map((workshop, index) =>
                    <div key={workshop.id || index}>
                        <div className='details'>
                            <p>Request ID: {workshop.request_id}</p>
                            <p>Client: {workshop.company}</p>
                            <p>Assigned Trainers: {getTrainersOfWorkshop(workshop)}</p>
                        </div>
                    </div>
                    )}
                </div>
            </li>
        );
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
        <div className="calendar-legend">
            <div className="legend-item">
                <span className="legend-color workshop-in-between"></span>
                <span className="legend-text">One Workshop</span>
            </div>
            <div className="legend-item">
                <span className="legend-color multiple-workshops"></span>
                <span className="legend-text">Multiple Workshops</span>
            </div>
        </div>
    </div>
    );
};

export default ColourCalendar;
