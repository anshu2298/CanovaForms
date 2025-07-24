import { useState } from "react";
import FormSidebar from "../../components/formSidebar/FormSidebar";
import FormCanvas from "../../components/formCanvas/FormCanvas";
import "./BuildFormPage.css";
function BuildFormPage() {
  const [pages, setPages] = useState([
    { id: "page-01", name: "Page 01", active: true },
    { id: "page-02", name: "Page 02", active: false },
    { id: "page-03", name: "Page 03", active: false },
    { id: "page-04", name: "Page 04", active: false },
  ]);

  const [formTitle, setFormTitle] = useState("Title");

  const addNewPage = () => {
    const newPageNumber = pages.length + 1;
    const newPage = {
      id: `page-${newPageNumber
        .toString()
        .padStart(2, "0")}`,
      name: formTitle,
      // name: `Page ${newPageNumber
      //   .toString()
      //   .padStart(2, "0")}`,
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
    </div>
  );
}

export default BuildFormPage;
