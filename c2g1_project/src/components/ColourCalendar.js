import React, { useState, useEffect } from 'react';
import '../styles/colourcalendar.css';
import 'boxicons/css/boxicons.min.css';

const ColourCalendar = ({workshopdata, ondateClick, trainerdata}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);
    
    console.log("workshopdata")
    console.log(workshopdata)

    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    

    //workshopdata: array of objects
    const workshopStarts = workshopdata.map(workshop => convertDate(workshop.start_date));
    const workshopEnds = workshopdata.map(workshop => convertDate(workshop.end_date));

    const getWorkshopByDate = (date) => {
        return workshopdata.filter(workshop => convertDate(workshop.start_date) === date || convertDate(workshop.end_date) === date
        || (new Date(workshop.start_date) <= new Date(date) && new Date(workshop.end_date) >= new Date(date)));
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
        }).filter(name => name); // Filter out any null/undefined values

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
        const formattedDay = `${currYear}-${("0" + (currMonth + 1)).slice(-2)}-${("0" + i).slice(-2)}`; //YYYY-MM-DD
        let isWorkshopStart = workshopStarts.includes(formattedDay) ? "workshop-start" : "";
        let isWorkshopEnd = workshopEnds.includes(formattedDay) ? "workshop-end" : "";
        let isWorkshopInBetween = getWorkshopByDate(formattedDay).length > 0 ? "workshop-in-between" : "";
        let isPreWorkshop = preWorkshopDates.includes(formattedDay) ? "pre-workshop-day" : "";

        let classNames = `${isToday} ${isWorkshopStart} ${isWorkshopEnd} ${isWorkshopInBetween} ${isPreWorkshop}`.trim();
        return classNames
    }

    //adding days to calendar
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag.push(
        <li className="inactive" key={`prev${i}`}>
            {lastDateofLastMonth - i + 1}
        </li>
        );
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let classNames = getclassNames(i);
        //workshop details is an array of objects
        let currentdate = `${currYear}-${("0" + (currMonth + 1)).slice(-2)}-${("0" + i).slice(-2)}`
        let workshopDetails = getWorkshopByDate(currentdate)
        liTag.push(
            <li className={classNames} key={`curr${i}`}>
                <button className='day-number' onClick={() => ondateClick(currentdate)}>{i}</button> 
                <div className='calendar-details'>
                    {workshopDetails.map((workshop, index) =>
                        <div className='details' key={workshop.id || index}>
                            {/*<p>Workshop: {workshop.workshop_data.workshop_name}</p>*/}
                            <p>Client: {workshop.company}</p>
                            <p>Assigned Trainers: {getTrainersOfWorkshop(workshop)}</p>
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
        <div className="calendar-legend">
                    <div className="legend-item">
                        <span className="legend-color workshop-start"></span>
                        <span className="legend-text">Workshop Start</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color workshop-end"></span>
                        <span className="legend-text">Workshop End</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color workshop-in-between"></span>
                        <span className="legend-text">Conducting Workshop</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color pre-workshop-day"></span>
                        <span className="legend-text">7 Days before Workshop</span>
                    </div>
                </div>  
    </div>
    );
};

export default ColourCalendar;
