import { useState } from "react";
import "./DatePicker.css";

const DatePicker = ({ onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear()
  );

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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last (6)
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const date = `${currentYear}-${String(
      currentMonth + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelect(date);
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
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth =
        currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear =
        currentMonth === 0 ? currentYear - 1 : currentYear;
      const prevMonthDays = getDaysInMonth(
        prevMonth,
        prevYear
      );
      const day = prevMonthDays - firstDay + i + 1;

      days.push(
        <div
          key={`prev-${day}`}
          className='calendar-day prev-month'
        >
          {day}
        </div>
      );
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isWeekend = (firstDay + day - 1) % 7 >= 5;
      days.push(
        <div
          key={day}
          className={`calendar-day current-month ${
            isWeekend ? "weekend" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    // Add days from next month to fill the grid
    const totalCells =
      Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells =
      totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className='calendar-day next-month'
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className='date-picker-overlay'
      onClick={onClose}
    >
      <div
        className='date-picker'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='calendar-header'>
          <button
            className='nav-button'
            onClick={handlePrevMonth}
          >
            ‹
          </button>
          <span className='month-year'>
            {months[currentMonth]} {currentYear}
          </span>
          <button
            className='nav-button'
            onClick={handleNextMonth}
          >
            ›
          </button>
        </div>

        <div className='calendar-grid'>
          <div className='days-header'>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className='day-header'
              >
                {day}
              </div>
            ))}
          </div>

          <div className='days-grid'>
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
