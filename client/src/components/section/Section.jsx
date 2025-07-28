import "./Section.css";
import { useState } from "react";
import { useFormCreation } from "../../context/FormCreationContext";
import { IoMdClose } from "react-icons/io";
import QuestionComponent from "../question/QuestionComponent";
import TextBlock from "../textBlock/TextBlock";
import ImageBlock from "../imageBlock/ImageBlock";
import VideoBlock from "../videoBlock/VideoBlock";

function Section({ section, pageId }) {
  const {
    setActiveSection,
    deleteSectionFromActivePage,
    hexToRGBA,
    updateTextBlockInSection,
  } = useFormCreation();

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is ?",
      type: "Multiple Choice",
    },
  ]);

  const color = hexToRGBA(
    section.backgroundColor,
    section.backgroundOpacity
  );

  const handleQuestionChange = (questionId, data) => {
    // If question text is empty, remove the question
    if (data.question === "" && questions.length > 1) {
      setQuestions((prev) =>
        prev.filter((q) => q.id !== questionId)
      );
      return;
    }

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, ...data } : q
      )
    );
  };

  if (!section) return null;
  return (
    <div
      className={`form-section ${
        section.active ? "active" : ""
      }`}
      style={{
        backgroundColor: color,
      }}
    >
      <div className='section-header'>
        <input
          type='checkbox'
          checked={section.active}
          onChange={() =>
            setActiveSection(pageId, section.id)
          }
        />
        <button
          className='delete-section-btn'
          onClick={() =>
            deleteSectionFromActivePage(section.id)
          }
        >
          <IoMdClose size={18} />
        </button>
      </div>

      <div className='section-body'>
        {section.content?.length === 0 ? (
          <p className='section-fallback-text'>
            No content yet. Start adding questions, text, or
            media!
          </p>
        ) : (
          section.content.map((block) => {
            switch (block.type) {
              case "question":
                return (
                  <QuestionComponent
                    key={block.id}
                    question={block.data}
                    contentId={block.id}
                    pageId={pageId}
                    sectionId={section.id}
                    onChange={(data) =>
                      handleQuestionChange(
                        questions.id,
                        data
                      )
                    }
                  />
                );
              case "text":
                return (
                  <TextBlock
                    key={block.id}
                    data={block.data}
                    onChange={(newData) =>
                      updateTextBlockInSection(
                        pageId,
                        section.id,
                        block.id,
                        newData
                      )
                    }
                  />
                );
              case "image":
                return (
                  <ImageBlock
                    key={block.id}
                    data={block}
                  />
                );
              case "video":
                return (
                  <VideoBlock
                    key={block.id}
                    block={block}
                  />
                );
              default:
                return null;
            }
          })
        )}
      </div>
    </div>
  );
}

export default Section;
