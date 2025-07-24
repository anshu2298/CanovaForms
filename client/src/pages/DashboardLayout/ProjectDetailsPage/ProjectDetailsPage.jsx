import { FaArrowLeftLong } from "react-icons/fa6";
import "./ProjectDetailsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import FormCard from "../../../components/formCard/FormCard";
import { useProjects } from "../../../context/ProjectContext";
import { useEffect } from "react";
import { useForms } from "../../../context/FormContext";
const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects } = useProjects();
  const { forms, fetchForms, createFormsInsideProject } =
    useForms();

  const project = projects.find((p) => p._id === projectId);

  useEffect(() => {
    fetchForms(projectId);
  }, [projectId]);

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
        {forms.map((form) => (
          <FormCard
            key={form._id}
            form={form}
          />
        ))}
      </div>
      <div className='project-details-footer'>
        <button
          className='add-forms-btn'
          onClick={() => {
            createFormsInsideProject(projectId);
          }}
        >
          Create New Forms
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
