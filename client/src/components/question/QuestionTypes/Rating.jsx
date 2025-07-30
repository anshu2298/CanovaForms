import { useState, useEffect } from "react";
import "./QuestionTypes.css";

const Rating = ({ questionData, onUpdate }) => {
  const [scale, setScale] = useState(
    questionData.scale || 5
  );
  const [rating, setRating] = useState(
    questionData.value || 0
  );

  // Update external state when rating changes
  useEffect(() => {
    onUpdate?.({ value: rating, scale });
  }, [rating, scale]);

  const handleRatingClick = (i) => {
    setRating(i);
  };

  const renderStars = () => {
    const stars = [];
    const starCount = Number(scale) || 0;
    for (let i = 1; i <= starCount; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='question-type'>
      <div className='ratting-container'>
        <div className='stars'>{renderStars()}</div>
        <div className='star-count'>
          <p className='ratting-label'>Star Count:</p>
          <input
            type='number'
            min={1}
            max={10}
            className='ratting-input'
            value={scale === "" ? "" : scale}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setScale("");
              } else {
                const num = Number(val);
                if (num >= 1 && num <= 10) {
                  setScale(num);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;
