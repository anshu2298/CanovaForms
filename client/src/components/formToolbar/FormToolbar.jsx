import "./FormToolbar.css";
import { IoMdAdd } from "react-icons/io";
import { ImParagraphLeft } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { RxVideo } from "react-icons/rx";
import { RxSection } from "react-icons/rx";
import { LiaClipboardListSolid } from "react-icons/lia";
function FormToolbar({
  backgroundColor,
  sectionColor,
  onBackgroundColorChange,
  onSectionColorChange,
  backgroundOpacity,
  sectionOpacity,
  onBackgroundOpacityChange,
  onSectionOpacityChange,
}) {
  const toolbarItems = [
    {
      id: "question",
      label: "Add Question",
      icon: <IoMdAdd />,
    },
    {
      id: "text",
      label: "Add Text",
      icon: <ImParagraphLeft />,
    },
    {
      id: "condition",
      label: "Add Condition",
      icon: <LiaClipboardListSolid />,
    },
    {
      id: "image",
      label: "Add Image",
      icon: <CiImageOn />,
    },
    { id: "video", label: "Add Video", icon: <RxVideo /> },
    {
      id: "sections",
      label: "Add Sections",
      icon: <RxSection />,
    },
  ];

  const handleToolbarClick = (itemId) => {
    console.log(`${itemId} clicked`);
  };

  return (
    <div className='form-toolbar'>
      <div className='toolbar-items'>
        {toolbarItems.map((item) => (
          <button
            key={item.id}
            className='toolbar-item'
            onClick={() => handleToolbarClick(item.id)}
          >
            <span className='toolbar-icon'>
              {item.icon}
            </span>
            <span className='toolbar-label'>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className='color-controls'>
        <div className='color-section'>
          <label className='color-label'>
            Background Color
          </label>

          <div className='color-input-group'>
            <>
              <div
                className='color-preview'
                style={{
                  backgroundColor: backgroundColor,
                  opacity: backgroundOpacity / 100,
                }}
              ></div>
              <input
                name='color-input'
                type='text'
                value={backgroundColor}
                onChange={(e) =>
                  onBackgroundColorChange(e.target.value)
                }
                className='color-input'
              />
            </>
            <input
              type='number'
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input '
              value={backgroundOpacity}
              onChange={(e) =>
                onBackgroundOpacityChange(e.target.value)
              }
            />
          </div>
        </div>

        <div className='color-section'>
          <label className='color-label'>
            Section Color
          </label>
          <div className='color-input-group'>
            <div
              className='color-preview'
              style={{
                backgroundColor: sectionColor,
                opacity: sectionOpacity / 100,
              }}
            ></div>
            <input
              type='text'
              value={sectionColor}
              onChange={(e) =>
                onSectionColorChange(e.target.value)
              }
              className='color-input'
            />

            <input
              type='number'
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input '
              value={sectionOpacity}
              onChange={(e) =>
                onSectionOpacityChange(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className='toolbar-footer'>
        <button className='next-btn'>Next</button>
      </div>
    </div>
  );
}

export default FormToolbar;
