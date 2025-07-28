/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
// import { useForms } from "./FormContext";
import { toast } from "react-toastify";

const FormCreationContext = createContext();

export const useFormCreation = () =>
  useContext(FormCreationContext);

export const FormCreationProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    title: "Untitled Form",
    pages: [
      {
        _id: "temp-id-1",
        name: "",
        active: true,
        pageBackgroundColor: "#ffffff",
        pageBackgroundOpacity: 100,
        sections: [],
      },
    ],
  });

  // const { fetchFormsById } = useForms();

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

  const hexToRGBA = (hex, opacity = 100) => {
    if (!hex || typeof hex !== "string")
      return "rgba(0,0,0,1)";
    let r = 0,
      g = 0,
      b = 0;

    if (hex.startsWith("#")) hex = hex.slice(1);

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    const alpha = Math.max(0, Math.min(100, opacity)) / 100;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
      content: [],
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
    toast.success("Section Added.");
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

  const deleteSectionFromActivePage = (sectionId) => {
    setFormState((prev) => {
      return {
        ...prev,
        pages: prev.pages.map((page) =>
          page.active
            ? {
                ...page,
                sections: page.sections.filter(
                  (section) => section.id !== sectionId
                ),
              }
            : page
        ),
      };
    });

    toast.success("Section deleted.");
  };

  const addQuestionToActiveSection = () => {
    const newQuestionBlock = {
      id: `question-${Date.now()}`,
      type: "question",
      data: {
        questionType: "short-answer", // default subtype
        label: "Untitled Question",
        required: false,
        options: [],
      },
    };

    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.active
                  ? {
                      ...section,
                      content: [
                        ...(section.content ?? []),
                        newQuestionBlock,
                      ],
                    }
                  : section
              ),
            }
          : page
      ),
    }));
  };

  const addTextBlockToActiveSection = () => {
    const newTextBlock = {
      id: `text-${Date.now()}`,
      type: "text",
      data: {
        text: "",
      },
    };

    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.active
                  ? {
                      ...section,
                      content: [
                        ...(section.content ?? []), // ensure array
                        newTextBlock,
                      ],
                    }
                  : section
              ),
            }
          : page
      ),
    }));
  };

  const uploadToCloudinaryViaServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:3000/api/media/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.url;
  };

  const addImageBlockToActiveSection = (url) => {
    const newImageBlock = {
      id: `image-${Date.now()}`,
      type: "image",
      data: {
        url,
        alt: "Uploaded Image",
      },
    };

    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.active
                  ? {
                      ...section,
                      content: [
                        ...(section.content || []),
                        newImageBlock,
                      ],
                    }
                  : section
              ),
            }
          : page
      ),
    }));
  };

  const addVideoBlockToActiveSection = () => {
    const newVideoBlock = {
      id: `video-${Date.now()}`,
      type: "video",
      data: {
        url: "", // Empty initially
      },
    };

    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.active
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.active
                  ? {
                      ...section,
                      content: [
                        ...(section.content || []),
                        newVideoBlock,
                      ],
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

      const newPage = await response.json();
      setFormState((prev) => ({
        ...prev,
        pages: [
          ...prev.pages.map((page) => ({
            ...page,
            active: false,
          })),
          { ...newPage, sections: [], active: true }, // add sections and active flag
        ],
      }));
      toast.success("New page added.");
      return newPage;
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

      setFormState((prev) => {
        const updatedPages = prev.pages
          .filter((page) => page._id !== pageId)
          .map((page, index) => ({
            ...page,
            active: index === 0,
          }));

        return {
          ...prev,
          pages: updatedPages,
        };
      });
      toast.success("Page Deleted.");
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
        hexToRGBA,
        activePage,
        setFormTitle,
        activeSection,
        setActivePage,
        setActiveSection,
        createPageInForm,
        deletePageFromForm,
        initializeFormState,
        addSectionToActivePage,
        addQuestionToActiveSection,
        uploadToCloudinaryViaServer,
        deleteSectionFromActivePage,
        addTextBlockToActiveSection,
        addImageBlockToActiveSection,
        addVideoBlockToActiveSection,
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
