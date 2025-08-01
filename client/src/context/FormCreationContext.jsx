/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import { API_PATHS } from "../utils/apiPaths";

const FormCreationContext = createContext();

export const useFormCreation = () =>
  useContext(FormCreationContext);

export const FormCreationProvider = ({ children }) => {
  const [conditionsMode, setConditionsMode] =
    useState(false);
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
        questionType: "Multiple Choice", // default subtype
        label: "What is ..?",
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

  const deleteQuestionFromSection = (
    pageId,
    sectionId,
    contentId
  ) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page._id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      content: section.content.filter(
                        (block) => block.id !== contentId
                      ),
                    }
                  : section
              ),
            }
          : page
      ),
    }));
  };

  const updateQuestionBlockInSection = (
    pageId,
    sectionId,
    contentId,
    newData
  ) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page._id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      content: section.content.map(
                        (block) =>
                          block.id === contentId
                            ? {
                                ...block,
                                data: newData,
                              }
                            : block
                      ),
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

  const updateTextBlockInSection = (
    pageId,
    sectionId,
    blockId,
    updatedData
  ) => {
    setFormState((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page._id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      content: section.content.map(
                        (block) =>
                          block.id === blockId
                            ? {
                                ...block,
                                data: {
                                  ...block.data,
                                  ...updatedData,
                                },
                              }
                            : block
                      ),
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

    const res = await fetch(API_PATHS.MEDIA.UPLOAD_MEDIA, {
      method: "POST",
      body: formData,
    });

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

  const addVideoBlockToActiveSection = (url) => {
    const newVideoBlock = {
      id: `video-${Date.now()}`,
      type: "video",
      data: {
        url,
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

  const deleteBlockFromSection = (sectionId, blockId) => {
    setFormState((prev) => {
      const updatedPages = prev.pages.map((page) => {
        return {
          ...page,
          sections: page.sections.map((section) => {
            if (section.id !== sectionId) return section;

            return {
              ...section,
              content: section.content.filter(
                (block) => block.id !== blockId
              ),
            };
          }),
        };
      });

      return { ...prev, pages: updatedPages };
    });
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
      _id: formFromDB._id || "",
      title: formFromDB.title || "Untitled Form",
      createdAt: formFromDB.createdAt || "",
      updatedAt: formFromDB.updatedAt || "",
      pages: updatedPages,
      user: formFromDB.user,
      project: formFromDB.project,
    });
  };

  // Create New page in the Form.
  const createPageInForm = async (formId) => {
    try {
      const response = await fetch(
        API_PATHS.FORMS.ADD_PAGE(formId),
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

      const { newPage } = await response.json();
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

  //  Save a Form.
  const saveForm = async (formState) => {
    // Sanitize the form state before sending
    const cleanedForm = {
      _id: formState._id,
      title: formState.title,
      user: formState.user,
      project: formState.project,
      pages: formState.pages.map((page) => ({
        name: page.name,
        pageBackgroundColor: page.pageBackgroundColor,
        pageBackgroundOpacity: page.pageBackgroundOpacity,
        sections: page.sections.map((section) => ({
          id: section.id,
          backgroundColor: section.backgroundColor,
          backgroundOpacity: section.backgroundOpacity,
          content: section.content,
        })),
      })),
    };

    try {
      const response = await fetch(
        API_PATHS.FORMS.SAVE_FORM(formState._id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedForm),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save form. Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Form saved successfully:", data);
      return data;
    } catch (error) {
      console.error("Error saving form:", error);
      throw error;
    }
  };

  // Delete Page from a Form.
  const deletePageFromForm = async (formId, pageId) => {
    try {
      const response = await fetch(
        API_PATHS.FORMS.DELETE_PAGE_FROM_FORM(
          formId,
          pageId
        ),
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
        formState,
        hexToRGBA,
        saveForm,
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
        updateTextBlockInSection,
        deleteQuestionFromSection,
        updateQuestionBlockInSection,
        deleteBlockFromSection,
        conditionsMode,
        setConditionsMode,
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
