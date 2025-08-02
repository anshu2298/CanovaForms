import { useEffect, useState, useRef } from "react";
import "./QuestionTypes.css";

const Dropdown = ({ questionData, onUpdate }) => {
  const nextOptionIdRef = useRef(Date.now());
  const [options, setOptions] = useState(() =>
    questionData.options?.length
      ? questionData.options
      : [
          {
            id: `opt-${nextOptionIdRef.current++}`,
            text: "",
          },
        ]
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
      id === updatedOptions[updatedOptions.length - 1]?.id;
    if (isLastOption && newText.trim() !== "") {
      // Generate a new unique id using the ref.
      const newOption = {
        id: `opt-${nextOptionIdRef.current++}`,
        text: "",
      };
      updatedOptions.push(newOption);
    }

    setOptions(updatedOptions);
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
                type='text'
                value={option.text}
                onChange={(e) =>
                  updateOption(option.id, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, option)}
                className='dropdown-option-text-input'
                placeholder='Option text'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
