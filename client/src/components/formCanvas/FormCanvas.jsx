import { useState } from "react";
import "./FormCanvas.css";
import FormToolbar from "../formToolbar/FormToolbar";

function FormCanvas({ title, onTitleChange }) {
  const [backgroundColor, setBackgroundColor] =
    useState("#B6B6B6");
  const [sectionColor, setSectionColor] =
    useState("#B6B6B6");

  const [backgroundOpacity, setBackgroundOpacity] =
    useState(100);
  const [sectionOpacity, setSectionOpacity] = useState(100);
  return (
    <div className='form-canvas'>
      <div className='canvas-header'>
        <input
          type='text'
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className='canvas-title'
        />
        <div className='canvas-actions'>
          <button className='preview-btn'>Preview</button>
          <button className='save-btn'>Save</button>
        </div>
      </div>

      <div className='canvas-content'>
        <div className='canvas-workspace'>
          {/* This is where form elements would be dropped and edited */}
          <div className='empty-canvas'>
            <p>
              Drop form elements here to start building your
              form
            </p>
          </div>
        </div>
        <FormToolbar
          backgroundColor={backgroundColor}
          sectionColor={sectionColor}
          onBackgroundColorChange={setBackgroundColor}
          onSectionColorChange={setSectionColor}
          backgroundOpacity={backgroundOpacity}
          sectionOpacity={sectionOpacity}
          onBackgroundOpacityChange={setBackgroundOpacity}
          onSectionOpacityChange={setSectionOpacity}
        />
      </div>
    </div>
  );
}

export default FormCanvas;
