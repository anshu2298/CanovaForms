import { useState } from "react";
import "./PreviewQuestionBlock.css";
const PreviewQuestionBlock = ({
  data,
  questionCounter,
}) => {
  const [rating, setRating] = useState(0);
  const handleRatingClick = (i) => {
    setRating(i);
  };
  const renderQuestion = () => {
    switch (data.questionType) {
      case "Short Answer":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <input
                className='short-answer-input'
                type='text'
                disabled
                placeholder='Short answer'
              />
            </div>
          </div>
        );
      case "Long Answer":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <textarea
                className='long-answer-input'
                disabled
                placeholder='Long answer'
              ></textarea>
            </div>
          </div>
        );
      case "Multiple Choice":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              {data.options?.map((opt) => (
                <div
                  key={opt.id}
                  className='option-input-group'
                >
                  <input
                    type='radio'
                    disabled
                    className='option-radio'
                  />
                  <label className='option-text-input options'>
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case "Checkbox":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              {data.options?.map((opt) => (
                <div
                  key={opt.id}
                  className='option-input-group'
                >
                  <input
                    type='checkbox'
                    disabled
                    className='option-checkbox'
                  />
                  <label className='option-text-input options'>
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case "Dropdown":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <select className='custom-select'>
                {data.options?.map((opt) => (
                  <option key={opt.id}>{opt.text}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case "Date":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <input
                type='date'
                className='preview-date-picker'
              />
            </div>
          </div>
        );
      case "File Upload":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='extra-padding'>
              <div className='file-upload-area'>
                <div className='file-upload-icon'>📁</div>
                <div className='file-upload-text'>
                  <div>
                    Click to upload or drag and drop
                  </div>
                </div>
                <input
                  type='file'
                  multiple={data.noOfFiles > 1}
                  accept={data.typeOfFile}
                  className='file-input'
                />
              </div>
            </div>
          </div>
        );
      case "Linear Scale":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='scale-container extra-padding'>
              <div className='scale-body'>
                <span>{data.scaleStart}</span>
                <input
                  type='range'
                  min={data.scaleStart}
                  max={data.scaleEnd}
                  className='scale-slider'
                />
                <span>{data.scaleEnd}</span>
              </div>
              <div className='scale-footer'>
                <p className='scale-label'>Value:</p>
                <p className='scale-value'>7</p>
              </div>
            </div>
          </div>
        );

      case "Rating":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.label}
              </label>
            </div>
            <div className='stars extra-padding'>
              {Array.from(
                { length: Number(data.scale) || 0 },
                (_, i) => {
                  const index = i + 1;
                  return (
                    <span
                      key={index}
                      className={`star ${
                        index <= rating ? "filled" : ""
                      }`}
                      onClick={() =>
                        handleRatingClick(index)
                      }
                    >
                      ★
                    </span>
                  );
                }
              )}
            </div>
          </div>
        );
      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className='preview-question-block'>
      {renderQuestion()}
    </div>
  );
};

export default PreviewQuestionBlock;
