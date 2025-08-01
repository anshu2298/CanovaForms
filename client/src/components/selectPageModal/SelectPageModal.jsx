import { useState } from "react";
import "./SelectPageModal.css";

const SelectPageModal = ({ isOpen, onClose, form }) => {
  const [truePageSelection, setTruePageSelection] =
    useState("Page");
  const [falsePageSelection, setFalsePageSelection] =
    useState("Page");

  if (!isOpen) return null;

  const handleContinue = () => {
    console.log("Continue clicked", {
      truePageSelection,
      falsePageSelection,
    });
    onClose();
  };

  return (
    <div
      className='modal-backdrop'
      onClick={onClose}
    >
      <div
        className='modal-container'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal-close'
          onClick={onClose}
        >
          ×
        </button>

        <div className='modal-content'>
          <h2 className='modal-title'>Select Page</h2>
          <p className='modal-description'>
            If the conditions are all met, if lead the user
            to the page you've
            <span className='highlight'>
              {" "}
              Selected
            </span>{" "}
            here
          </p>

          <div className='form-section'>
            <label className='form-label'>
              Select, if it's true
            </label>
            <div className='select-wrapper'>
              <select
                value={truePageSelection}
                onChange={(e) =>
                  setTruePageSelection(e.target.value)
                }
                className='custom-select'
              >
                <option
                  value='Page'
                  disabled
                >
                  Select a page
                </option>
                {form.pages.slice(1).map((page) => {
                  if (page._id === falsePageSelection)
                    return null;
                  return (
                    <option
                      key={page._id}
                      value={page._id}
                    >
                      {page.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className='form-section'>
            <label className='form-label'>
              Select, if it's false
            </label>
            <div className='select-wrapper'>
              <select
                value={falsePageSelection}
                onChange={(e) =>
                  setFalsePageSelection(e.target.value)
                }
                className='custom-select'
              >
                <option
                  value='Page'
                  disabled
                >
                  Select a page
                </option>
                {form.pages.slice(1).map((page) => {
                  // Exclude the currently selected truePage
                  if (page._id === truePageSelection)
                    return null;
                  return (
                    <option
                      key={page._id}
                      value={page._id}
                    >
                      {page.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className='continue-btn'
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPageModal;
