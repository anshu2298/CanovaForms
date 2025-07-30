import { useState, useEffect } from "react";
import "./QuestionTypes.css";

const MultipleChoice = ({ questionData, onUpdate }) => {
  const [options, setOptions] = useState(() =>
    questionData.options?.length
      ? questionData.options
      : [{ id: 1, text: "", selected: false }]
  );

  useEffect(() => {
    onUpdate?.({ options });
  }, [options]);

  const updateOption = (id, newText) => {
    let updatedOptions = options.map((opt) =>
      opt.id === id ? { ...opt, text: newText } : opt
    );

    if (
      newText.trim() === "" &&
      updatedOptions.length > 1
    ) {
      updatedOptions = updatedOptions.filter(
        (opt) => opt.id !== id
      );
      setOptions(updatedOptions);
      return;
    }

    const isLastOption =
      id === Math.max(...updatedOptions.map((o) => o.id));
    if (isLastOption && newText.trim() !== "") {
      const newOption = {
        id:
          Math.max(...updatedOptions.map((o) => o.id)) + 1,
        text: "",
        selected: false,
      };
      updatedOptions.push(newOption);
    }

    setOptions(updatedOptions);
  };

  const selectOption = (id) => {
    setOptions(
      options.map((opt) =>
        opt.id === id
          ? { ...opt, selected: true }
          : { ...opt, selected: false }
      )
    );
  };

  const handleKeyDown = (e, option) => {
    if (
      e.key === "Backspace" &&
      option.text.trim() === "" &&
      options.length > 1
    ) {
      e.preventDefault();
      setOptions((prev) =>
        prev.filter((opt) => opt.id !== option.id)
      );
    }
  };

  return (
    <div className='question-type'>
      <div className='options-list'>
        {options.map((option) => (
          <div
            key={option.id}
            className='option-item'
          >
            <div className='option-input-group'>
              <input
                type='radio'
                name={`question-${questionData.id}`}
                checked={option.selected}
                onChange={() => selectOption(option.id)}
                className='option-radio'
              />
              <input
                type='text'
                value={option.text}
                onChange={(e) =>
                  updateOption(option.id, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, option)}
                className='option-text-input'
                placeholder='Option text'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
