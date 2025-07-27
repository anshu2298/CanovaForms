import "./Projects.css";
import ProjectCard from "../../../components/projectCard/ProjectCard";
import { useProjects } from "../../../context/ProjectContext";
const Projects = () => {
  const { filteredProjects } = useProjects();
  return filteredProjects.length === 0 ? (
    <p className='fallback-text'>No Projects available.</p>
  ) : (
    <div className='projects-grid'>
      {filteredProjects.map((project) => {
        return (
          <ProjectCard
            key={project._id}
            project={project}
          />
        );
      })}
    </div>
  );
};

export default Projects;
