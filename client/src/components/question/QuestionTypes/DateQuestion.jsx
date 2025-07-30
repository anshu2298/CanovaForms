import { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import "./QuestionTypes.css";
import { FaRegCalendarAlt } from "react-icons/fa";
const DateQuestion = ({ questionData }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div className='date-question'>
      <p>DD/MM/YYYY</p>
      <FaRegCalendarAlt
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
      />
      <div
        className={`calendar-container ${
          showCalendar ? "hidden" : ""
        }`}
      >
        <DatePicker />
      </div>
    </div>
  );
};

export default DateQuestion;
