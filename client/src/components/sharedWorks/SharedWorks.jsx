import "./SharedWorks.css";
import ProjectCard from "../projectCard/ProjectCard";
import FormCard from "../formCard/FormCard";
function SharedWorks() {
  const sharedFiles = [];
  return (
    <div className='shared-works'>
      <h2 className='section-title'>Shared Works</h2>
      {sharedFiles.length === 0 ? (
        <p>No Projects or Forms available.</p>
      ) : (
        <div className='works-grid'></div>
      )}
    </div>
  );
}

export default SharedWorks;
