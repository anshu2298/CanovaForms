import { createContext, useContext, useState } from "react";
import { useForms } from "./FormContext";
import { toast } from "react-toastify";

const FormCreationContext = createContext();

export const useFormCreation = () =>
  useContext(FormCreationContext);

export const FormCreationProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    title: "Untitled Form",
    pages: [
      {
        id: "",
        name: "",
        active: true,
        backgroundColor: "",
        backgroundOpacity: 100,
        sections: [],
      },
    ],
  });

  const { fetchFormsById } = useForms();

  const [pageColor, setPageColor] = useState("#B6B6B6");
  const [pageOpacity, setPageOpacity] = useState(100);

  const [sectionColor, setSectionColor] =
    useState("#ffffff");
  const [sectionOpacity, setSectionOpacity] = useState(100);

  const activePage = formState.pages.find((p) => p.active);

  const activeSection = activePage?.sections.find(
    (s) => s.active
  );

  const setFormTitle = (title) => {
    setFormState((prev) => ({ ...prev, title }));
  };

  const setActivePage = (pageId) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => ({
        ...page,
        active: page._id === pageId,
      })),
    }));
  };

  const setActiveSection = (pageId, sectionId) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page._id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) => ({
                ...section,
                active:
                  section.id === sectionId
                    ? !section.active
                    : false,
              })),
            }
          : page
      ),
    }));
  };

  const addSectionToActivePage = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      backgroundColor: sectionColor,
      backgroundOpacity: sectionOpacity,
      questions: [],
    };
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: [
                ...(page.sections || []),
                newSection,
              ],
            }
          : page
      ),
    }));
  };

  const setSectionColorById = (
    sectionId,
    color,
    opacity
  ) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      backgroundColor: color,
                      backgroundOpacity: opacity,
                    }
                  : section
              ),
            }
          : page
      ),
    }));
  };

  const setPageColorById = (pageId, color, opacity) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page._id === pageId
          ? {
              ...page,
              pageBackgroundColor: color,
              pageBackgroundOpacity: opacity,
            }
          : page
      ),
    }));
  };

  const initializeFormState = (formFromDB) => {
    let updatedPages = formFromDB.pages;

    if (!updatedPages || updatedPages.length === 0) {
      updatedPages = [];
    } else {
      updatedPages = updatedPages.map((page, index) => ({
        ...page,
        active: page.active ?? index === 0,
      }));
      // console.log(updatedPages);
    }
    setFormState({
      title: formFromDB.title || "Untitled Form",
      pages: updatedPages,
    });
  };

  // Create New page in the Form.
  const createPageInForm = async (formId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/form/${formId}/add-page`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to create page"
        );
      }

      const data = await response.json();
      await fetchFormsById(formId);
      toast.success("New page added.");
      return data;
    } catch (err) {
      console.error("Error creating page:", err.message);
      toast.error("Failed to add New page !");
      throw err;
    }
  };

  // Delete Page from a Form.
  const deletePageFromForm = async (formId, pageId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/form/${formId}/delete-page/${pageId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to delete page"
        );
      }

      const data = await response.json();
      await fetchFormsById(formId);
      toast.success("Page Deleted.");
      return data;
    } catch (err) {
      console.error("Error deleting page:", err.message);
      toast.error("Error deleting page");
      throw err;
    }
  };

  return (
    <FormCreationContext.Provider
      value={{
        ...formState,
        activePage,
        setFormTitle,
        activeSection,
        setActivePage,
        setActiveSection,
        createPageInForm,
        deletePageFromForm,
        initializeFormState,
        addSectionToActivePage,
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
      }}
    >
      {children}
    </FormCreationContext.Provider>
  );
};
