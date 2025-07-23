import "./Projects.css";
import ProjectCard from "../../../components/projectCard/ProjectCard";
import { useProjects } from "../../../context/ProjectContext";
const Projects = () => {
  const { filteredProjects } = useProjects();
  return (
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
