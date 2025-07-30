import "./Section.css";
import { useFormCreation } from "../../context/FormCreationContext";
import { IoMdClose } from "react-icons/io";
import TextBlock from "../textBlock/TextBlock";
import ImageBlock from "../imageBlock/ImageBlock";
import VideoBlock from "../videoBlock/VideoBlock";
import Question from "../question/Question/Question";

function Section({ section, pageId }) {
  const {
    setActiveSection,
    deleteSectionFromActivePage,
    hexToRGBA,
    updateTextBlockInSection,
    deleteQuestionFromSection,
    updateQuestionBlockInSection,
  } = useFormCreation();

  const handleQuestionChange = (contentId, data) => {
    if (data.label.trim() === "") {
      deleteQuestionFromSection(
        pageId,
        section.id,
        contentId
      );
    } else {
      updateQuestionBlockInSection(
        pageId,
        section.id,
        contentId,
        data
      );
    }
  };

  let questionCounter = 0;

  const color = hexToRGBA(
    section.backgroundColor,
    section.backgroundOpacity
  );

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
            if (block.type === "question") {
              questionCounter += 1;
              return (
                <Question
                  key={block.id}
                  questionData={block.data}
                  questionNumber={questionCounter}
                  onUpdate={(newData) =>
                    handleQuestionChange(block.id, newData)
                  }
                  onDelete={() =>
                    deleteQuestionFromSection(
                      pageId,
                      section.id,
                      block.id
                    )
                  }
                />
              );
            }

            switch (block.type) {
              case "text":
                return (
                  <TextBlock
                    key={block.id}
                    sectionId={section.id}
                    data={block}
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
