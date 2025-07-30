import { useState, useEffect } from "react";
import "./QuestionTypes.css";

const LinearScale = ({ questionData, onUpdate }) => {
  const [scaleStart, setScaleStart] = useState(
    questionData.scaleStart ?? 0
  );
  const [scaleEnd, setScaleEnd] = useState(
    questionData.scaleEnd ?? 10
  );
  const [value, setValue] = useState(
    questionData.value ?? 5
  );
  useEffect(() => {
    onUpdate?.({
      scaleStart,
      scaleEnd,
      value,
    });
  }, [scaleStart, scaleEnd, value]);
  return (
    <div className='scale-container'>
      <div className='scale-header'>
        <input
          className='sacle-input'
          type='number'
          placeholder='Scale Starting'
          value={scaleStart}
          onChange={(e) =>
            setScaleStart(Number(e.target.value))
          }
        />
        <input
          className='sacle-input'
          type='number'
          placeholder='Scale Ending'
          value={scaleEnd}
          onChange={(e) =>
            setScaleEnd(Number(e.target.value))
          }
        />
      </div>
      <div className='scale-body'>
        <span>{scaleStart}</span>
        <input
          type='range'
          min={scaleStart}
          max={scaleEnd}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className='scale-slider'
        />
        <span>{scaleEnd}</span>
      </div>
      <div className='scale-footer'>
        <p className='scale-label'>Value:</p>
        <p className='scale-value'>{value}</p>
      </div>
    </div>
  );
};

export default LinearScale;
