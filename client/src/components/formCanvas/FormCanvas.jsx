import "./FormCanvas.css";
import FormToolbar from "../formToolbar/FormToolbar";
import Section from "../section/Section";
import { useFormCreation } from "../../context/FormCreationContext";

function FormCanvas({ title, onTitleChange }) {
  const { activePage } = useFormCreation();
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
        <div
          className='canvas-workspace'
          style={{
            backgroundColor:
              activePage?.pageBackgroundColor,
            opacity:
              (activePage?.pageBackgroundOpacity || 1) /
              100,
          }}
        >
          {activePage?.sections?.length > 0 ? (
            activePage.sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                pageId={activePage._id}
              />
            ))
          ) : (
            <div className='empty-canvas'>
              <p>
                Add a New Section to start Building your
                Form.
              </p>
            </div>
          )}
        </div>
        <FormToolbar />
      </div>
    </div>
  );
}

export default FormCanvas;
