import { useEffect, useState } from "react";
import "./QuestionTypes.css";

const ShortAnswer = ({ questionData, onUpdate }) => {
  const [answer, setAnswer] = useState(
    questionData.answer || ""
  );

  useEffect(() => {
    onUpdate?.({ answer });
  }, [answer]);

  return (
    <div className='question-type'>
      <input
        type='text'
        placeholder='Short answer text'
        className='short-answer-input'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
};

export default ShortAnswer;
