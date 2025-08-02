/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { API_PATHS } from "../utils/apiPaths";
const FormContext = createContext();

export const FormsProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formByID, setFormById] = useState({});
  const [allForms, setAllForms] = useState([]);
  const [standaloneForms, setStandaloneForms] = useState(
    []
  );
  const [sharedForms, setSharedForms] = useState([]);

  const [formSearchQuery, setFormSearchQuery] =
    useState("");

  const ALL_FORMS = [...standaloneForms, ...sharedForms];

  const filteredForms = Array.isArray(ALL_FORMS)
    ? ALL_FORMS.filter((form) =>
        form.title
          .toLowerCase()
          .includes(formSearchQuery.toLowerCase())
      )
    : [];

  const fetchForms = async (projectId) => {
    try {
      setLoading(true);
      const res = await fetch(
        API_PATHS.FORMS.GET_FORMS_INSIDE_PROJECT(projectId),
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setForms(data);
    } catch (err) {
      console.error("Failed to fetch forms", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllForms = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        API_PATHS.FORMS.GET_ALL_FORMS,
        { credentials: "include" }
      );
      const data = await res.json();
      setAllForms(data);
      setStandaloneForms(
        data.filter((form) => form.project === null)
      );
    } catch (error) {
      console.error("Failed to fetch forms", error);
    } finally {
      setLoading(false);
    }
  };

  const shareForm = async (formId, userEmail) => {
    try {
      const response = await fetch(
        API_PATHS.FORMS.SHARE_FORM(formId),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail }),
          credentials: "include", // if you're using cookies for auth
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to share form"
        );
      }

      console.log("Form shared successfully:", data);
      return data;
    } catch (error) {
      console.error("Error sharing form:", error.message);
      throw error;
    }
  };

  const getSharedForms = async () => {
    try {
      const response = await fetch(
        API_PATHS.FORMS.GET_SHARED_FORMS,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to fetch shared forms"
        );
      }

      const data = await response.json();
      setSharedForms(data.sharedForms);
    } catch (error) {
      console.error("Error fetching shared forms:", error);
      throw error;
    }
  };

  const fetchFormsById = async (formId) => {
    try {
      setLoading(true);
      const res = await fetch(
        API_PATHS.FORMS.GET_FORM_BY_FORMID(formId)
      );
      const data = await res.json();
      setFormById(data);
    } catch (err) {
      console.error("Failed to fetch forms", err);
    } finally {
      setLoading(false);
    }
  };

  const createFormsInsideProject = async (projectId) => {
    try {
      const res = await fetch(API_PATHS.FORMS.CREATE_FORM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          projectId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create project"
        );
      }
      await fetchForms(projectId);
      toast.success("Form created successfully!");
    } catch (err) {
      console.error("Create Project Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const createStandaloneForm = async (navigate) => {
    try {
      const res = await fetch(API_PATHS.FORMS.CREATE_FORM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      navigate(`/form-page/${data._id}`);
      fetchAllForms();
    } catch (error) {
      console.log(error);
    }
  };

  const updateForms = async (formId, title, projectId) => {
    setLoading(true);
    try {
      const res = await fetch(
        API_PATHS.FORMS.RENAME_FORM(formId),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Form name updated.");
        fetchAllForms();
        if (projectId) {
          await fetchForms(projectId);
        }
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating form name:", error);
      toast.error(
        "Something went wrong while updating form name."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (formId, projectId) => {
    try {
      const res = await fetch(
        API_PATHS.FORMS.DELETE_FORM(formId),
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete Form"
        );
      }
      if (projectId) {
        await fetchForms(projectId);
      }
      fetchAllForms();
      toast.success("Form deleted successfully!");
    } catch (err) {
      console.log("Delete Project Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllForms();
    getSharedForms();
  }, []);

  return (
    <FormContext.Provider
      value={{
        forms,
        loading,
        fetchForms,
        createFormsInsideProject,
        deleteForm,
        formByID,
        fetchFormsById,
        createStandaloneForm,
        allForms,
        standaloneForms,
        fetchAllForms,
        updateForms,
        formSearchQuery,
        setFormSearchQuery,
        filteredForms,
        shareForm,
        getSharedForms,
        sharedForms,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForms = () => useContext(FormContext);
