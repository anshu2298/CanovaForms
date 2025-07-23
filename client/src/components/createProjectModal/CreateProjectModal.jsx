import { useState } from "react";
import "./CreateProjectModal.css";
import { GrCube } from "react-icons/gr";
import { useProjects } from "../../context/ProjectContext";
function CreateProjectModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const { createProject } = useProjects();
  const [projectName, setProjectName] = useState("");
  const [formName, setFormName] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (projectName.trim() && formName.trim()) {
      await createProject(projectName, formName);
      setProjectName("");
      setFormName("");
      onClose();
    }
    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='create-project-modal-overlay'
      onClick={handleOverlayClick}
    >
      <div className='create-project-modal-content'>
        <div className='create-project-modal-header'>
          <div className='create-project-modal-icon'>
            <span>
              <GrCube size={30} />
            </span>
          </div>
          <button
            className='create-project-modal-close'
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className='create-project-modal-body'>
          <h2 className='create-project-modal-title'>
            Create Project
          </h2>
          <p className='create-project-modal-description'>
            Provide your project a name and start with your
            journey
          </p>

          <form
            onSubmit={handleSubmit}
            className='create-project-modal-form'
          >
            <div className='create-project-modal-form-group'>
              <label className='create-project-modal-form-label'>
                Name
              </label>
              <input
                type='text'
                className='create-project-modal-form-input'
                placeholder='Project Name'
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                required
              />
            </div>

            <div className='create-project-modal-form-group'>
              <label className='create-project-modal-form-label'>
                Name
              </label>
              <input
                type='text'
                className='create-project-modal-form-input'
                placeholder='Form Name'
                value={formName}
                onChange={(e) =>
                  setFormName(e.target.value)
                }
                required
              />
            </div>

            <button
              disabled={loading}
              type='submit'
              className='create-project-modal-button'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
