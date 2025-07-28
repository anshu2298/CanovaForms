import { useState, useEffect } from "react";
import "./TextBlock.css";

function TextBlock({ data, onChange }) {
  const [text, setText] = useState(data?.text || "");

  useEffect(() => {
    if (onChange) {
      onChange({ ...data, text });
    }
  }, [text]);

  return (
    <div className='text-block'>
      <textarea
        maxLength={200}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter instructional text here...'
        className='text-block-textarea'
      />
    </div>
  );
}

export default TextBlock;
