import "./UserForm.css";
import PreviewImageBlock from "../previewComponents/PreviewImageBlock/PreviewImageBlock";
import PreviewQuestionBlock from "../previewComponents/PreviewQuestionBlock/PreviewQuestionBlock";
import PreviewVideoBlock from "../previewComponents/PreviewVideoBlock/PreviewVideoBlock";
import PreviewTextBlock from "../previewComponents/PreviewTextBlock/PreviewTextBlock";
const UserForm = ({
  title,
  currentPage,
  handleResponseChange,
}) => {
  let questionCount = 0;

  return (
    <div
      className='preview-page'
      style={{
        backgroundColor:
          currentPage.pageBackgroundColor || "#fff",
      }}
    >
      <div className='preview-header'>
        <h1 className='preview-title'>{title}</h1>
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
        ))}
      </div>
    </div>
  );
};

export default UserForm;
