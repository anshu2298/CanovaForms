import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProjects = projects.filter((project) =>
    project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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

      // Optionally update context state
      await fetchProjects();
      toast.success("Project created successfully!");
      return data; // in case caller wants to navigate to project or use the form
    } catch (err) {
      console.error("Create Project Error:", err);
      toast.error(err.message || "Something went wrong");
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchProjects,
        loading,
        createProject,
        deleteProject,
        setSearchQuery,
        searchQuery,
        filteredProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () =>
  useContext(ProjectsContext);
