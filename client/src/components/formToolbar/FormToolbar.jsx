import "./FormToolbar.css";
import { IoMdAdd } from "react-icons/io";
import { ImParagraphLeft } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { RxVideo, RxSection } from "react-icons/rx";
import { LiaClipboardListSolid } from "react-icons/lia";
import { useFormCreation } from "../../context/FormCreationContext";

function FormToolbar() {
  const {
    activePage,
    activeSection,
    sectionColor,
    sectionOpacity,
    setSectionColor,
    setSectionOpacity,
    setSectionColorById,
    pageColor,
    pageOpacity,
    setPageColor,
    setPageOpacity,
    setPageColorById,
    addSectionToActivePage,
    addQuestionToActiveSection,
    addTextBlockToActiveSection,
    addImageBlockToActiveSection,
    addVideoBlockToActiveSection,
  } = useFormCreation();

  const handleSectionColorChange = (color) => {
    setSectionColor(color);
    const sectionId = activeSection.id;
    if (sectionId)
      setSectionColorById(sectionId, color, sectionOpacity);
  };

  const handleSectionOpacityChange = (opacity) => {
    setSectionOpacity(opacity);
    const sectionId = activeSection.id;
    if (sectionId)
      setSectionColorById(
        sectionId,
        sectionColor,
        Number(opacity)
      );
  };

  const handlePageColorChange = (color) => {
    setPageColor(color);
    const pageId = activePage._id;
    if (pageId) {
      setPageColorById(pageId, color, pageOpacity);
    }
  };

  const handlePageOpacityChange = (opacity) => {
    setPageOpacity(opacity);
    const pageId = activePage._id;
    if (pageId) {
      setPageColorById(pageId, pageColor, opacity);
    }
  };

  const handleToolbarClick = (itemId) => {
    if (itemId === "sections") addSectionToActivePage?.();
    if (itemId === "question")
      addQuestionToActiveSection?.();
    if (itemId === "text") addTextBlockToActiveSection?.();
    if (itemId === "image")
      addImageBlockToActiveSection?.();
    if (itemId === "video")
      addVideoBlockToActiveSection?.();
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
            disabled={
              item.id !== "sections" && !activeSection
            }
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
                  activePage?.pageBackgroundColor,
                opacity:
                  (activePage?.pageBackgroundOpacity || 1) /
                  100,
              }}
            ></div>
            <input
              name='color-input'
              type='text'
              value={activePage?.pageBackgroundColor}
              onChange={(e) =>
                handlePageColorChange(e.target.value)
              }
              className='color-input'
            />
            <input
              type='number'
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input'
              value={activePage?.pageBackgroundOpacity}
              onChange={(e) =>
                handlePageOpacityChange(e.target.value)
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
                backgroundColor:
                  activeSection?.backgroundColor,
                opacity:
                  (activeSection?.backgroundOpacity || 1) /
                  100,
              }}
            ></div>
            <input
              disabled={!activeSection}
              type='text'
              value={activeSection?.backgroundColor || ""}
              onChange={(e) => {
                setSectionColor(e.target.value);
                handleSectionColorChange(e.target.value);
              }}
              className='color-input'
            />
            <input
              type='number'
              disabled={!activeSection}
              min='0'
              max='100'
              name='opacity-input'
              className='opacity-input'
              value={activeSection?.backgroundOpacity || ""}
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
