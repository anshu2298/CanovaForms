/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [sharedProjects, setSharedProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectSearchQuery, setProjectSearchQuery] =
    useState("");

  const allProjects = [...projects, ...sharedProjects];

  const filteredProjects = Array.isArray(allProjects)
    ? allProjects.filter((project) =>
        project.name
          .toLowerCase()
          .includes(projectSearchQuery.toLowerCase())
      )
    : [];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/project/all",
        {
          credentials: "include",
        }
      );
      if (!res.ok)
        throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(
        "Error fetching projects:",
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectName, formName) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/project/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies (for session-based auth)
          body: JSON.stringify({ projectName, formName }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create project"
        );
      }
      await fetchProjects();
      toast.success("Project created successfully!");
      return data;
    } catch (err) {
      console.error("Create Project Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const updateProject = async (projectId, name) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/project/update/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }), // only send name
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Project name updated.");
        fetchProjects();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating project name:", err);
      toast.error(
        "Something went wrong while updating project name."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/project/delete/${projectId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      // Refresh the projects list
      await fetchProjects();
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.log("Delete Project Error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const shareProject = async (projectId, userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/project/share/${projectId}`,
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
          data.message || "Failed to share project"
        );
      }

      console.log("project shared successfully:", data);
      return data;
    } catch (error) {
      console.error(
        "Error sharing project:",
        error.message
      );
      throw error;
    }
  };

  const getSharedProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/project/share/get-shared-projects",
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
          error.message || "Failed to fetch shared projects"
        );
      }

      const data = await response.json();
      setSharedProjects(data.sharedProjects);
    } catch (error) {
      console.error(
        "Error fetching shared projects:",
        error
      );
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
    getSharedProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchProjects,
        loading,
        createProject,
        deleteProject,
        setProjectSearchQuery,
        projectSearchQuery,
        filteredProjects,
        updateProject,
        sharedProjects,
        shareProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () =>
  useContext(ProjectsContext);
