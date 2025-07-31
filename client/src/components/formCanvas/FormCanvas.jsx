import "./FormCanvas.css";
import FormToolbar from "../formToolbar/FormToolbar";
import Section from "../section/Section";
import { useFormCreation } from "../../context/FormCreationContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function FormCanvas({ title, onTitleChange }) {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { activePage, hexToRGBA, formState, saveForm } =
    useFormCreation();

  const color = hexToRGBA(
    activePage?.pageBackgroundColor || "#ffffff",
    activePage?.pageBackgroundOpacity || 100
  );

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
          <button
            className='preview-btn'
            onClick={async () => {
              await saveForm(formState);
              navigate(`/preview/${formId}`);
            }}
          >
            Preview
          </button>
          <button
            className='save-btn'
            onClick={async () => {
              try {
                await saveForm(formState);
                toast.success("Form Saved");
              } catch (error) {
                console.log(error);
                toast.error("Failed to Save the Form");
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className='canvas-content'>
        {!activePage ? (
          <div className='empty-canvas'>
            <p>Add a Page to start Building your Form.</p>
          </div>
        ) : (
          <>
            <div
              className='canvas-workspace'
              style={{
                backgroundColor: color,
              }}
            >
              {activePage.sections?.length > 0 ? (
                activePage.sections.map((section) => (
                  <Section
                    key={`${section.id}-${section.content?.length}`}
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
          </>
        )}
      </div>
    </div>
  );
}

export default FormCanvas;
