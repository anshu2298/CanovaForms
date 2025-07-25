import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const FormContext = createContext();

export const FormsProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formByID, setFormById] = useState({});

  const fetchForms = async (projectId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/form/${projectId}`,
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

  const fetchFormsById = async (formId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/form/get-form/${formId}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setFormById(data);
    } catch (err) {
      console.error("Failed to fetch forms", err);
    } finally {
      setLoading(false);
    }
  };

  console.log(formByID);

  const createFormsInsideProject = async (projectId) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/form/create-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            projectId,
          }),
        }
      );
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

  const deleteForm = async (formId, projectId) => {
    try {
      console.log("FormId", formId);
      console.log("projectId", projectId);
      const res = await fetch(
        `http://localhost:3000/api/form/delete/${formId}`,
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
      // Refresh the projects list
      if (projectId) {
        await fetchForms(projectId);
      }
      toast.success("Form deleted successfully!");
    } catch (err) {
      console.log("Delete Project Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForms = () => useContext(FormContext);
