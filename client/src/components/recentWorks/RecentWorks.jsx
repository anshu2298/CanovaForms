import { useProjects } from "../../context/ProjectContext";
import FormCard from "../formCard/FormCard";
import ProjectCard from "../projectCard/ProjectCard";
import "./RecentWorks.css";

function RecentWorks() {
  const { projects } = useProjects();
  return (
    <div className='recent-works'>
      <h2 className='section-title'>Recent Works</h2>
      <div className='works-grid'>
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
        <FormCard draft={true} />
        <FormCard />
        <FormCard draft={true} />
      </div>
    </div>
  );
}

export default RecentWorks;
