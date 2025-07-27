import { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import "./QuestionComponent.css";

const QuestionComponent = ({
  questionNumber = 1,
  initialQuestion = "What is ?",
  initialType = "Multiple Choice",
  onChange,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [selectedType, setSelectedType] =
    useState(initialType);
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(
    []
  );
  const [scaleValue, setScaleValue] = useState(5);
  const [rating, setRating] = useState(0);
  const [showDatePicker, setShowDatePicker] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const questionTypes = [
    "Short Answer",
    "Long Answer",
    "Multiple Choice",
    "Checkbox",
    "Dropdown",
    "File Upload",
    "Date",
    "Linear Scale",
    "Rating",
  ];

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    onChange &&
      onChange({
        question: e.target.value,
        type: selectedType,
        answer: getAnswerValue(),
      });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setAnswer("");
    setSelectedOptions([]);
    onChange &&
      onChange({
        question,
        type: e.target.value,
        answer: "",
      });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;

    // If user typed in the last option and it's not empty, add a new empty option
    if (
      index === options.length - 1 &&
      value.trim() !== ""
    ) {
      newOptions.push("");
    }

    // Remove empty options except the last one (but keep at least one option)
    const filteredOptions = newOptions.filter(
      (option, i) => {
        if (i === newOptions.length - 1) return true; // Always keep the last option
        return option.trim() !== ""; // Remove empty options except the last one
      }
    );

    // Ensure we always have at least one option
    if (filteredOptions.length === 0) {
      filteredOptions.push("");
    }

    setOptions(filteredOptions);
  };

  const handleOptionKeyDown = (index, e) => {
    // If backspace is pressed on an empty option, remove it
    if (
      e.key === "Backspace" &&
      options[index] === "" &&
      options.length > 1
    ) {
      e.preventDefault();
      const newOptions = options.filter(
        (_, i) => i !== index
      );
      setOptions(newOptions);
    }
  };

  const handleMultipleChoiceChange = (value) => {
    setAnswer(value);
    onChange &&
      onChange({
        question,
        type: selectedType,
        answer: value,
      });
  };

  const handleCheckboxChange = (value, checked) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedOptions, value];
    } else {
      newSelected = selectedOptions.filter(
        (option) => option !== value
      );
    }
    setSelectedOptions(newSelected);
    onChange &&
      onChange({
        question,
        type: selectedType,
        answer: newSelected,
      });
  };

  const handleRatingClick = (value) => {
    setRating(value);
    onChange &&
      onChange({
        question,
        type: selectedType,
        answer: value,
      });
  };

  const getAnswerValue = () => {
    switch (selectedType) {
      case "Multiple Choice":
      case "Dropdown":
      case "Short Answer":
      case "Long Answer":
      case "Date":
      case "File Upload":
        return answer;
      case "Checkbox":
        return selectedOptions;
      case "Linear Scale":
        return scaleValue;
      case "Rating":
        return rating;
      default:
        return "";
    }
  };

  const renderInput = () => {
    switch (selectedType) {
      case "Short Answer":
        return (
          <input
            type='text'
            className='answer-input'
            placeholder='Short answer text'
            value={answer}
            maxLength={100}
            onChange={(e) => setAnswer(e.target.value)}
          />
        );

      case "Long Answer":
        return (
          <textarea
            className='answer-textarea'
            placeholder='Long answer text'
            value={answer}
            maxLength={500}
            onChange={(e) => setAnswer(e.target.value)}
            rows='4'
          />
        );

      case "Multiple Choice":
        return (
          <div className='options-container'>
            {options.map((option, index) => (
              <div
                key={index}
                className='option-item'
              >
                <input
                  type='radio'
                  id={`option-${index}`}
                  name={`question-${questionNumber}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) =>
                    handleMultipleChoiceChange(
                      e.target.value,
                      index
                    )
                  }
                />
                <input
                  type='text'
                  className='option-input'
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOptionKeyDown(index, e)
                  }
                />
              </div>
            ))}
          </div>
        );

      case "Checkbox":
        return (
          <div className='options-container'>
            {options.map((option, index) => (
              <div
                key={index}
                className='option-item'
              >
                <input
                  type='checkbox'
                  id={`checkbox-${index}`}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      option,
                      e.target.checked
                    )
                  }
                />
                <input
                  type='text'
                  className='option-input'
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleOptionKeyDown(index, e)
                  }
                />
              </div>
            ))}
          </div>
        );

      case "Dropdown":
        return (
          <select
            className='answer-select'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          >
            <option value=''>Select an option</option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        );

      case "File Upload":
        return (
          <input
            type='file'
            className='file-input'
            onChange={(e) =>
              setAnswer(e.target.files[0]?.name || "")
            }
          />
        );

      case "Date":
        return (
          <div className='date-picker-container'>
            <div
              className='date-input-display'
              onClick={() =>
                setShowDatePicker(!showDatePicker)
              }
            >
              <span className='calendar-icon'>📅</span>
              <span>{selectedDate || "Select date"}</span>
            </div>
            {showDatePicker && (
              <DatePicker
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setAnswer(date);
                  setShowDatePicker(false);
                  onChange &&
                    onChange({
                      question,
                      type: selectedType,
                      answer: date,
                    });
                }}
                onClose={() => setShowDatePicker(false)}
              />
            )}
          </div>
        );

      case "Linear Scale":
        return (
          <div className='scale-container'>
            <div className='scale-labels'>
              <span>1</span>
              <span>10</span>
            </div>
            <input
              type='range'
              min='1'
              max='10'
              value={scaleValue}
              onChange={(e) =>
                setScaleValue(Number(e.target.value))
              }
              className='scale-slider'
            />
            <div className='scale-value'>
              Value: {scaleValue}
            </div>
          </div>
        );

      case "Rating":
        return (
          <div className='rating-stars'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= rating ? "filled" : ""
                }`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='question-component'>
      <div className='question-header'>
        <div className='question-input-container'>
          <span className='question-number'>
            Q{questionNumber}
          </span>
          <input
            type='text'
            className='question-input'
            value={question}
            onChange={handleQuestionChange}
            placeholder='Enter your question'
          />
        </div>
        <select
          className='type-dropdown'
          value={selectedType}
          onChange={handleTypeChange}
        >
          {questionTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className='answer-section'>{renderInput()}</div>
    </div>
  );
};

export default QuestionComponent;
