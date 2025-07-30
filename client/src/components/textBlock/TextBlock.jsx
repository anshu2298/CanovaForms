import { useState, useEffect } from "react";
import "./TextBlock.css";
import { useFormCreation } from "../../context/FormCreationContext";

function TextBlock({ data, onChange, sectionId }) {
  const { deleteBlockFromSection } = useFormCreation();
  const [text, setText] = useState(data.data?.text || "");

  const handleKeyDown = (e) => {
    const isEmpty = text.trim() === "";

    if (e.key === "Backspace" && isEmpty) {
      e.preventDefault(); // prevent default backspace behavior
      deleteBlockFromSection(sectionId, data.id);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange({ ...data, text });
    }
  }, [text]);

  return (
    <textarea
      maxLength={200}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder='Enter instructional text here...'
      className='text-block-textarea'
    />
  );
}

export default TextBlock;
