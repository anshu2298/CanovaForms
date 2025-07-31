import "./Preview.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForms } from "../../context/FormContext";
import PreviewTextBlock from "../../components/previewComponents/PreviewTextBlock/PreviewTextBlock";
import PreviewImageBlock from "../../components/previewComponents/PreviewImageBlock/PreviewImageBlock";
import PreviewVideoBlock from "../../components/previewComponents/PreviewVideoBlock/PreviewVideoBlock";
import PreviewQuestionBlock from "../../components/previewComponents/PreviewQuestionBlock/PreviewQuestionBlock";

const Preview = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [currentPageIndex, setCurrentPageIndex] =
    useState(0);

  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  const totalPages = formByID.pages.length;
  const currentPage = formByID.pages[currentPageIndex];

  let questionCounter = 0;

  if (!formByID) return <p>Loading preview...</p>;

  return (
    <div className='preview-container'>
      <div className='form-preview'>
        <div
          className='preview-page'
          style={{
            backgroundColor:
              currentPage.pageBackgroundColor || "#fff",
          }}
        >
          <div className='preview-header'>
            <h1 className='preview-title'>
              {formByID.title}
            </h1>
          </div>

          <div className='preview-page-content'>
            {currentPage.sections.map((section) => (
              <div
                key={section.id}
                className='preview-section'
                style={{
                  backgroundColor:
                    section.backgroundColor || "#fff",
                }}
              >
                {section.content.map((block) => {
                  if (block.type === "question") {
                    questionCounter += 1;
                    return (
                      <PreviewQuestionBlock
                        questionCounter={questionCounter}
                        key={block.id}
                        data={block.data}
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
            ))}
          </div>
        </div>
        <div className='page-navigation'>
          <button
            onClick={() =>
              setCurrentPageIndex((prev) =>
                Math.max(prev - 1, 0)
              )
            }
            disabled={currentPageIndex === 0}
          >
            Previous
          </button>
          <span className='page-number'>
            {currentPageIndex + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPageIndex((prev) =>
                Math.min(prev + 1, totalPages - 1)
              )
            }
            disabled={currentPageIndex === totalPages - 1}
          >
            Next
          </button>
        </div>
        <button
          onClick={() => navigate(`/form-page/${formId}`)}
          className='back-to-edit'
        >
          Back to Edit
        </button>
      </div>
    </div>
  );
};

export default Preview;
