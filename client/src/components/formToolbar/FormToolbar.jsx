import "./FormToolbar.css";
import { IoMdAdd } from "react-icons/io";
import { ImParagraphLeft } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { RxVideo, RxSection } from "react-icons/rx";
import { LiaClipboardListSolid } from "react-icons/lia";
import { useFormCreation } from "../../context/FormCreationContext";

function FormToolbar({ onAddSection }) {
  const {
    activePage,
    backgroundColor,
    backgroundOpacity,
    setBackgroundForActivePage,
    sectionColor,
    sectionOpacity,
    setSectionColor,
    setSectionOpacity,
    setSectionColorById,
  } = useFormCreation();

  const handleBackgroundColorChange = (color) => {
    setBackgroundForActivePage(color, backgroundOpacity);
  };

  const handleBackgroundOpacityChange = (opacity) => {
    setBackgroundForActivePage(backgroundColor, opacity);
  };

  const getLastSectionId = () => {
    const lastSection = activePage?.sections?.slice(-1)[0];
    return lastSection?.id;
  };

  const handleSectionColorChange = (color) => {
    setSectionColor(color);
    const sectionId = getLastSectionId();
    if (sectionId)
      setSectionColorById(sectionId, color, sectionOpacity);
  };

  const handleSectionOpacityChange = (opacity) => {
    setSectionOpacity(opacity);
    const sectionId = getLastSectionId();
    if (sectionId)
      setSectionColorById(
        sectionId,
        sectionColor,
        Number(opacity)
      );
  };

  const handleToolbarClick = (itemId) => {
    if (itemId === "sections") onAddSection?.();
    else console.log(`${itemId} clicked`);
  };

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
      label: "Add Section",
      icon: <RxSection />,
    },
  ];

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
            <div
              className='color-preview'
              style={{
                backgroundColor:
                  activePage?.backgroundColor,
                opacity:
                  activePage?.backgroundOpacity / 100,
              }}
            ></div>
            <input
              name='color-input'
              type='text'
              value={activePage.backgroundColor}
              onChange={(e) =>
                handleBackgroundColorChange(e.target.value)
              }
              className='color-input'
            />
            <input
              type='number'
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input'
              value={backgroundOpacity}
              onChange={(e) =>
                handleBackgroundOpacityChange(
                  e.target.value
                )
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
              onChange={(e) => {
                setSectionColor(e.target.value);
                handleSectionColorChange(e.target.value);
              }}
              className='color-input'
            />
            <input
              type='number'
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input'
              value={sectionOpacity}
              onChange={(e) => {
                setSectionOpacity(e.target.value);
                handleSectionOpacityChange(e.target.value);
              }}
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
