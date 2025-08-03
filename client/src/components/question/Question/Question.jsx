import { useEffect, useState } from "react";
import ShortAnswer from "../QuestionTypes/ShortAnswer";
import LongAnswer from "../QuestionTypes/LongAnswer";
import MultipleChoice from "../QuestionTypes/MultipleChoice";
import Checkbox from "../QuestionTypes/Checkbox";
import Dropdown from "../QuestionTypes/Dropdown";
import FileUpload from "../QuestionTypes/FileUpload";
import LinearScale from "../QuestionTypes/LinearScale";
import Rating from "../QuestionTypes/Rating";
import "./Question.css";
import { getInitialQuestionData } from "../../../utils/questionHelper";
import DateSelector from "../QuestionTypes/DateSelector";

const QUESTION_TYPES = [
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

const Question = ({
  questionData,
  onUpdate,
  onDelete,
  questionNumber,
  questionId,
}) => {
  // console.log(questionData);
  const [label, setLabel] = useState(questionData.label);
  const [questionType, setQuestionType] = useState(
    questionData.questionType
  );

  useEffect(() => {
    setLabel(questionData.label);
    setQuestionType(questionData.questionType);
  }, [questionData.label, questionData.questionType]);

  const handleQuestionChange = (e) => {
    const newLabel = e.target.value;
    setLabel(newLabel);

    if (newLabel.trim() === "") {
      onDelete?.();
      return;
    }

    onUpdate?.({ label: newLabel, questionType });
  };

  const handleQuestionTypeChange = (e) => {
    const newType = e.target.value;

    const newQuestionData = getInitialQuestionData(
      newType,
      {
        label: questionData.label,
        required: questionData.required,
      }
    );

    onUpdate?.(newQuestionData);
  };

  const handleChildUpdate = (data) => {
    const updated = {
      ...questionData,
      ...data,
      label,
      questionType,
    };
    onUpdate?.(updated);
  };

  const renderQuestionType = () => {
    const sharedProps = {
      questionData,
      onUpdate: handleChildUpdate,
      questionId,
    };

    switch (questionType) {
      case "Short Answer":
        return <ShortAnswer {...sharedProps} />;
      case "Long Answer":
        return <LongAnswer {...sharedProps} />;
      case "Multiple Choice":
        return <MultipleChoice {...sharedProps} />;
      case "Checkbox":
        return <Checkbox {...sharedProps} />;
      case "Dropdown":
        return <Dropdown {...sharedProps} />;
      case "File Upload":
        return <FileUpload {...sharedProps} />;
      case "Date":
        return <DateSelector {...sharedProps} />;
      case "Linear Scale":
        return <LinearScale {...sharedProps} />;
      case "Rating":
        return <Rating {...sharedProps} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className='question-container'>
      <div className='question-component-header'>
        <div className='question-number'>
          Q{questionNumber}
        </div>
        <input
          type='text'
          value={label}
          onChange={handleQuestionChange}
          className='question-input'
          placeholder='Enter your question'
        />
        <select
          value={questionType}
          onChange={handleQuestionTypeChange}
          className='question-type-dropdown'
        >
          {QUESTION_TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className='question-content'>
        {renderQuestionType()}
      </div>
    </div>
  );
};

export default Question;
