import { useRef, useState } from "react";
import "./PreviewQuestionBlock.css";
const PreviewQuestionBlock = ({
  data,
  questionCounter,
  onResponseChange,
}) => {
  console.log(data);
  const shortRef = useRef();
  const longRef = useRef();
  const sliderRef = useRef();
  const [rating, setRating] = useState(0);
  const [scaleValue, setScaleValue] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    []
  );
  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState(null);

  const sendResponse = (answer) => {
    onResponseChange &&
      onResponseChange({
        questionId: data.id,
        questionType: data.data.questionType,
        label: data.data.label,
        answer,
      });
  };

  const handleCheckboxChange = (text) => {
    let updated;
    if (selectedOptions.includes(text)) {
      updated = selectedOptions.filter((t) => t !== text);
    } else {
      updated = [...selectedOptions, text];
    }
    setSelectedOptions(updated);
    sendResponse(updated);
  };

  const handleRatingClick = (i) => {
    setRating(i);
    sendResponse(i);
  };
  const renderQuestion = () => {
    switch (data.data.questionType) {
      case "Short Answer":
        return (
          <div className='preview-question-container'>
            <div className='question-component-header'>
              <div className='question-number size'>
                Q{questionCounter}
              </div>
              <label className='question-statemant size'>
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <input
                ref={shortRef}
                className='short-answer-input'
                type='text'
                placeholder='Short answer'
                onBlur={() =>
                  sendResponse(shortRef.current.value)
                }
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
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <textarea
                ref={longRef}
                className='long-answer-input'
                onBlur={() =>
                  sendResponse(longRef.current.value)
                }
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
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              {data.data.options?.map((opt) => (
                <div
                  key={opt.id}
                  className='option-input-group'
                >
                  <input
                    type='radio'
                    name={`mcq-${data._id}`}
                    className='option-radio'
                    onChange={() => sendResponse(opt.text)}
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
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              {data.data.options?.map((opt) => (
                <div
                  key={opt.id}
                  className='option-input-group'
                >
                  <input
                    onChange={() =>
                      handleCheckboxChange(opt.text)
                    }
                    type='checkbox'
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
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <select
                className='custom-select '
                onChange={(e) =>
                  sendResponse(e.target.value)
                }
              >
                <option value=''>Select</option>
                {data.data.options?.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.text}
                  >
                    {opt.text}
                  </option>
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
                {data.data.label}
              </label>
            </div>
            <div className='preview-question-content'>
              <input
                type='date'
                onChange={(e) =>
                  sendResponse(e.target.value)
                }
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
                {data.data.label}
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
                  multiple={data.data.noOfFiles > 1}
                  accept={data.data.typeOfFile}
                  className='file-input'
                  onChange={(e) => {
                    const files = Array.from(
                      e.target.files
                    );
                    setSelectedFile(files);
                    sendResponse(
                      data.noOfFiles > 1
                        ? files.map((f) => f.name)
                        : files[0]?.name
                    );
                  }}
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
                {data.data.label}
              </label>
            </div>
            <div className='scale-container extra-padding'>
              <div className='scale-body'>
                <span>{data.data.scaleStart}</span>
                <input
                  ref={sliderRef}
                  type='range'
                  value={scaleValue}
                  min={data.data.scaleStart}
                  max={data.data.scaleEnd}
                  className='scale-slider'
                  onMouseUp={() =>
                    sendResponse(
                      Number(sliderRef.current.value)
                    )
                  }
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setScaleValue(val);
                  }}
                  onTouchEnd={() =>
                    sendResponse(
                      Number(sliderRef.current.value)
                    )
                  }
                />
                <span>{data.data.scaleEnd}</span>
              </div>
              <div className='scale-footer'>
                <p className='scale-label'>Value:</p>
                <p className='scale-value'>{scaleValue}</p>
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
                {data.data.label}
              </label>
            </div>
            <div className='stars extra-padding'>
              {Array.from(
                { length: Number(data.data.scale) || 5 },
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
