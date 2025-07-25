import { useState } from "react";
import FormSidebar from "./FormSidebar";
import FormCanvas from "./FormCanvas";
import FormToolbar from "./FormToolbar";
import "./FormBuilder.css";

function FormBuilder() {
  const [pages, setPages] = useState([
    { id: "page-01", name: "Page 01", active: true },
    { id: "page-02", name: "Page 02", active: false },
    { id: "page-03", name: "Page 03", active: false },
    { id: "page-04", name: "Page 04", active: false },
  ]);

  const [formTitle, setFormTitle] = useState("Title");
  const [backgroundColor, setBackgroundColor] =
    useState("#B6B6B6");
  const [sectionColor, setSectionColor] =
    useState("#B6B6B6");

  const addNewPage = () => {
    const newPageNumber = pages.length + 1;
    const newPage = {
      id: `page-${newPageNumber
        .toString()
        .padStart(2, "0")}`,
      name: `Page ${newPageNumber
        .toString()
        .padStart(2, "0")}`,
      active: false,
    };
    setPages([...pages, newPage]);
  };

  const setActivePage = (pageId) => {
    setPages(
      pages.map((page) => ({
        ...page,
        active: page.id === pageId,
      }))
    );
  };

  return (
    <div className='form-builder'>
      <FormSidebar
        pages={pages}
        onAddPage={addNewPage}
        onSelectPage={setActivePage}
      />
      <FormCanvas
        title={formTitle}
        onTitleChange={setFormTitle}
      />
      <FormToolbar
        backgroundColor={backgroundColor}
        sectionColor={sectionColor}
        onBackgroundColorChange={setBackgroundColor}
        onSectionColorChange={setSectionColor}
      />
    </div>
  );
}

export default FormBuilder;
