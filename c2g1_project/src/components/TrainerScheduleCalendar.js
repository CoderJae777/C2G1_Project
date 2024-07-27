import React, { useState, useEffect, useRef } from "react";
import "../styles/trainerschedulecalendar.css";
import "boxicons/css/boxicons.min.css";

const TrainerScheduleCalendar = ({ onClose, unavailability, fullname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [days, setDays] = useState([]);
  const popupRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    renderCalendar();
  }, [currYear, currMonth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, onClose]);

  const isDateUnavailable = (date) => {
    return unavailability.some((range) => {
      const start = new Date(range.start);
      const end = new Date(range.end);
      return date >= start && date <= end;
    });
  };

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag.push(
        <li className="inactive" key={`prev${i}`}>
          {lastDateofLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";

      let isUnavailable = isDateUnavailable(new Date(currYear, currMonth, i))
        ? "unavailable"
        : "";

      liTag.push(
        <li className={`${isToday} ${isUnavailable}`} key={`curr${i}`}>
          {i}
        </li>
      );
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag.push(
        <li className="inactive" key={`next${i}`}>
          {i - lastDayofMonth + 1}
        </li>
      );
    }

    setDays(liTag);
  };

  const handlePrevNext = (direction) => {
    setCurrMonth((prev) => (direction === "prev" ? prev - 1 : prev + 1));
    if (currMonth < 0 || currMonth > 11) {
      const newDate = new Date(currYear, currMonth, new Date().getDate());
      setDate(newDate);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    } else {
      setDate(new Date());
    }
  };

  return (
    <div
      ref={popupRef}
      data-cy="trainer-schedule-calendar-popup"
      className="trainer-schedule-calendar-popup"
    >
      <header>
        <div className="trainer-info-container">
          <div className="trainer-info">
            <p>Trainer: {fullname}</p>
          </div>
          <span
            data-cy="tsc-close-button"
            className="close-button"
            onClick={onClose}
          >
            <div className="fa-solid fa-x x-icon">
              <box-icon name="x"></box-icon>
            </div>
          </span>
        </div>
        <div className="title-row">
          <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
          <div className="icons">
            <span id="prev" className="arrow-left">
              <div
                className="fa-solid fa-chevron-left"
                onClick={() => handlePrevNext("prev")}
              >
                <box-icon name="chevron-left"></box-icon>
              </div>
            </span>
            <span
              id="next"
              className="arrow-right"
              onClick={() => handlePrevNext("next")}
            >
              <div className="fa-solid fa-chevron-right">
                <box-icon name="chevron-right"></box-icon>
              </div>
            </span>
          </div>
        </div>
      </header>
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
  );
};

export default TrainerScheduleCalendar;
