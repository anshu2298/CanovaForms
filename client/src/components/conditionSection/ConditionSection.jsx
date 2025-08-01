import { useState } from "react";
import PreviewImageBlock from "../previewComponents/PreviewImageBlock/PreviewImageBlock";
import PreviewQuestionBlock from "../previewComponents/PreviewQuestionBlock/PreviewQuestionBlock";
import PreviewTextBlock from "../previewComponents/PreviewTextBlock/PreviewTextBlock";
import PreviewVideoBlock from "../previewComponents/PreviewVideoBlock/PreviewVideoBlock";
import "./ConditionSection.css";
const ConditionSection = ({ section }) => {
  console.log(section);
  let questionCount = 0;
  const [responses, setResponses] = useState([]);

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
  return (
    <div
      key={section.id}
      className='condition-section'
      style={{
        backgroundColor: section.backgroundColor || "#fff",
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
                handleResponseChange(block.id, response)
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
              <p key={block.id}>Unsupported block type</p>
            );
        }
      })}
    </div>
  );
};

export default ConditionSection;
