import { createContext, useContext, useState } from "react";

const FormCreationContext = createContext();

export const useFormCreation = () =>
  useContext(FormCreationContext);

export const FormCreationProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    title: "Untitled Form",
    pages: [
      {
        id: "page-01",
        name: "Page 01",
        active: true,
        backgroundColor: "#B6B6B6",
        backgroundOpacity: 100,
        sections: [],
      },
    ],
  });

  const [sectionColor, setSectionColor] =
    useState("#B6B6B6");
  const [sectionOpacity, setSectionOpacity] = useState(100);

  const activePage = formState.pages.find((p) => p.active);

  const setFormTitle = (title) => {
    setFormState((prev) => ({ ...prev, title }));
  };

  const setActivePage = (pageId) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => ({
        ...page,
        active: page.id === pageId,
      })),
    }));
  };

  const addNewPage = () => {
    const newPageNumber = formState.pages.length + 1;
    const newPage = {
      id: `page-${newPageNumber
        .toString()
        .padStart(2, "0")}`,
      name: `Page ${newPageNumber
        .toString()
        .padStart(2, "0")}`,
      active: false,
      backgroundColor: "#B6B6B6",
      backgroundOpacity: 100,
      sections: [],
    };
    setFormState((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
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

  const setBackgroundForActivePage = (color, opacity) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              backgroundColor: color,
              backgroundOpacity: opacity,
            }
          : page
      ),
    }));
  };

  const initializeFormState = (formFromDB) => {
    let updatedPages = formFromDB.pages;

    if (!updatedPages || updatedPages.length === 0) {
      updatedPages = [
        {
          id: "page-01",
          name: "Page 01",
          active: true,
          backgroundColor: "#B6B6B6",
          backgroundOpacity: 100,
          sections: [],
        },
      ];
    } else {
      updatedPages = updatedPages.map((page, index) => ({
        ...page,
        backgroundColor: page.backgroundColor || "#B6B6B6",
        backgroundOpacity: page.backgroundOpacity ?? 100,
        active: page.active ?? index === 0,
      }));
    }

    setFormState({
      title: formFromDB.title || "Untitled Form",
      pages: updatedPages,
    });
  };

  return (
    <FormCreationContext.Provider
      value={{
        ...formState,
        activePage,
        setFormTitle,
        setActivePage,
        addNewPage,
        addSectionToActivePage,
        setSectionColorById,
        setBackgroundForActivePage,
        initializeFormState,
        sectionColor,
        sectionOpacity,
        setSectionColor,
        setSectionOpacity,
      }}
    >
      {children}
    </FormCreationContext.Provider>
  );
};
