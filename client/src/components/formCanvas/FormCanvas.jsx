import "./FormCanvas.css";
import FormToolbar from "../formToolbar/FormToolbar";
import Section from "../section/Section";
import { useFormCreation } from "../../context/FormCreationContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForms } from "../../context/FormContext";
import SelectPageModal from "../selectPageModal/SelectPageModal";
import PreviewImageBlock from "../previewComponents/PreviewImageBlock/PreviewImageBlock";
import PreviewTextBlock from "../previewComponents/PreviewTextBlock/PreviewTextBlock";
import PreviewVideoBlock from "../previewComponents/PreviewVideoBlock/PreviewVideoBlock";
import PreviewQuestionBlock from "../previewComponents/PreviewQuestionBlock/PreviewQuestionBlock";
function FormCanvas({ title, onTitleChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { formId } = useParams();
  const {
    activePage,
    hexToRGBA,
    formState,
    saveForm,
    conditionsMode,
  } = useFormCreation();

  let questionCount = 0;
  const [responses, setResponses] = useState([]);

  console.log(responses);

  const handleResponseChange = (
    questionId,
    responseObj
  ) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.questionId === questionId
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = responseObj;
        return updated;
      } else {
        return [...prev, responseObj];
      }
    });
  };

  const { fetchFormsById, formByID } = useForms();

  useEffect(() => {
    fetchFormsById(formId);
  }, [formId, conditionsMode]);

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
        <div
          className='canvas-workspace'
          style={{
            backgroundColor: color,
          }}
        >
          {conditionsMode ? (
            <>
              {formByID.pages[0].sections.map((section) => {
                console.log(section);
                return (
                  <div
                    key={section.id}
                    className='condition-section'
                    style={{
                      backgroundColor:
                        section.backgroundColor || "#fff",
                    }}
                  >
                    {section.content.map((block) => {
                      if (block.type === "question") {
                        questionCount += 1;
                        return (
                          <PreviewQuestionBlock
                            questionCounter={questionCount}
                            key={block.id}
                            data={block}
                            onResponseChange={(response) =>
                              handleResponseChange(
                                block.id,
                                response
                              )
                            }
                          />
                        );
                      }

                      switch (block.type) {
                        case "image":
                          return (
                            <PreviewImageBlock
                              key={block.id}
                              data={block.data}
                            />
                          );
                        case "text":
                          return (
                            <PreviewTextBlock
                              key={block.id}
                              data={block.data.text}
                            />
                          );
                        case "video":
                          return (
                            <PreviewVideoBlock
                              key={block.id}
                              data={block.data}
                            />
                          );
                        default:
                          return (
                            <p key={block.id}>
                              Unsupported block type
                            </p>
                          );
                      }
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {conditionsMode && (
          <button
            className='condition-btn'
            onClick={() => setIsModalOpen(true)}
          >
            Add Conditions
          </button>
        )}
        <FormToolbar />
      </div>
      <SelectPageModal
        isOpen={isModalOpen}
        form={formByID}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default FormCanvas;
