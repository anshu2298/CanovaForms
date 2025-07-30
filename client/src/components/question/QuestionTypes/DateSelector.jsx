import { useRef, useState } from "react";
import "./QuestionTypes.css";
import ReactDOM from "react-dom";
const DateSelector = ({ onUpdate }) => {
  const inputRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear()
  );
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
  });

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

  const daysOfWeek = [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
  ];

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => {
      if (!prev && inputRef.current) {
        const rect =
          inputRef.current.getBoundingClientRect();
        setCalendarPosition({
          top: rect.bottom + window.scrollY + 4, // 4px offset
          left: rect.left + window.scrollX,
        });
      }
      return !prev;
    });
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last (6)
  };

  const selectDate = (day) => {
    const formattedDate = `${String(day).padStart(
      2,
      "0"
    )}/${String(currentMonth + 1).padStart(
      2,
      "0"
    )}/${currentYear}`;
    setSelectedDate(formattedDate);
    onUpdate?.({ date: formattedDate });
    setIsCalendarOpen(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      currentMonth,
      currentYear
    );
    const firstDay = getFirstDayOfMonth(
      currentMonth,
      currentYear
    );
    const daysInPrevMonth = getDaysInMonth(
      currentMonth - 1 < 0 ? 11 : currentMonth - 1,
      currentMonth - 1 < 0 ? currentYear - 1 : currentYear
    );

    const days = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          className='calendar-day prev-month'
          disabled
        >
          {day}
        </button>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (firstDay + day - 1) % 7;
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday

      days.push(
        <button
          key={day}
          className={`calendar-day ${
            isWeekend ? "weekend" : ""
          }`}
          onClick={() => selectDate(day)}
        >
          {day}
        </button>
      );
    }

    // Next month's days to fill the grid
    const totalCells =
      Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells =
      totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      const dayOfWeek =
        (firstDay + daysInMonth + day - 1) % 7;
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      days.push(
        <button
          key={`next-${day}`}
          className={`calendar-day next-month ${
            isWeekend ? "weekend" : ""
          }`}
          disabled
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className='date-selector'>
      <div
        ref={inputRef}
        className='date-input-container'
      >
        <input
          type='text'
          className='date-input'
          placeholder='DD/MM/YYYY'
          value={selectedDate}
          readOnly
        />
        <button
          className='calendar-button'
          onClick={toggleCalendar}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <rect
              x='3'
              y='4'
              width='18'
              height='18'
              rx='2'
              ry='2'
            ></rect>
            <line
              x1='16'
              y1='2'
              x2='16'
              y2='6'
            ></line>
            <line
              x1='8'
              y1='2'
              x2='8'
              y2='6'
            ></line>
            <line
              x1='3'
              y1='10'
              x2='21'
              y2='10'
            ></line>
          </svg>
        </button>
      </div>

      {isCalendarOpen &&
        ReactDOM.createPortal(
          <div
            className='calendar-popup'
            style={{
              position: "absolute",
              top: calendarPosition.top,
              left: calendarPosition.left,
            }}
          >
            <div className='calendar-header'>
              <button
                className='nav-button'
                onClick={() => navigateMonth("prev")}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='15,18 9,12 15,6'></polyline>
                </svg>
              </button>
              <span className='month-year'>
                {months[currentMonth]}
              </span>
              <button
                className='nav-button'
                onClick={() => navigateMonth("next")}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='9,18 15,12 9,6'></polyline>
                </svg>
              </button>
            </div>

            <div className='calendar-days-header'>
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className={`day-header ${
                    index >= 5 ? "weekend-header" : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className='calendar-grid'>
              {renderCalendarDays()}
            </div>
          </div>,
          document.getElementById("calendar-root")
        )}
    </div>
  );
};

export default DateSelector;
