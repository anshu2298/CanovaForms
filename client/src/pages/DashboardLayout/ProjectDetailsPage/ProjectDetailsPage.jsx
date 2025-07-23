import { FaArrowLeftLong } from "react-icons/fa6";
import "./ProjectDetailsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import FormCard from "../../../components/formCard/FormCard";
import { useProjects } from "../../../context/ProjectContext";
const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p._id === projectId);
  return (
    <div className='project-details-page'>
      <div className='project-details-header'>
        <div
          onClick={() => navigate("/dashboard/projects")}
          className='project-details-icon'
        >
          <FaArrowLeftLong size={30} />
        </div>
        <p className='project-details-title'>
          {project.name}
        </p>
      </div>
      <div className='project-details-content'>
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
      </div>
      <div className='project-details-footer'>
        <button className='add-forms-btn'>
          Create New Forms
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
