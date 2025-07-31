import "./SharedWorks.css";
import ProjectCard from "../projectCard/ProjectCard";
import FormCard from "../formCard/FormCard";
import { useForms } from "../../context/FormContext";
import { useProjects } from "../../context/ProjectContext";
function SharedWorks() {
  const { sharedForms } = useForms();
  const { sharedProjects } = useProjects();
  const sharedFiles = [...sharedForms, ...sharedProjects];
  return (
    <div className='shared-works'>
      <h2 className='section-title'>Shared Works</h2>
      {sharedFiles.length === 0 ? (
        <p>No Projects or Forms available.</p>
      ) : (
        <div className='works-grid'>
          {sharedFiles.map((item) =>
            item.name ? (
              <ProjectCard
                key={item._id}
                project={item}
              />
            ) : (
              <FormCard
                key={item._id}
                form={item}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SharedWorks;
