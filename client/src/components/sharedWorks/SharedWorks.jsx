import "./SharedWorks.css";
import ProjectCard from "../projectCard/ProjectCard";
import FormCard from "../formCard/FormCard";
function SharedWorks() {
  return (
    <div className='shared-works'>
      <h2 className='section-title'>Shared Works</h2>
      <div className='works-grid'>
        <FormCard />
      </div>
    </div>
  );
}

export default SharedWorks;
