import { useEffect, useState } from "react";
import "./QuestionTypes.css";

const LongAnswer = ({ questionData, onUpdate }) => {
  const [answer, setAnswer] = useState(
    questionData.answer || ""
  );

  useEffect(() => {
    onUpdate?.({ answer });
  }, [answer]);
  return (
    <div className='question-type'>
      <textarea
        placeholder='Long answer text'
        className='long-answer-input'
        rows='4'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
};

export default LongAnswer;
