import "./ProjectCard.css";
import { IoFolderOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
function ProjectCard({ project }) {
  const { deleteProject } = useProjects();
  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);
  const menuButtonRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div className='project-card'>
      <Link to={`/dashboard/projects/${project._id}`}>
        <div className='project-header'>
          <IoFolderOutline
            className='folder-icon'
            size={100}
          />
        </div>
      </Link>
      <div className='project-footer'>
        <p className='project-title'>{project.name}</p>
        <div className='menu-container'>
          <button
            className='btn-menu'
            ref={menuButtonRef}
            onClick={handleMenuClick}
          >
            <CiMenuKebab size={20} />
          </button>
          {isDropdownOpen && (
            <DropdownMenu
              isOpen={isDropdownOpen}
              onClose={handleCloseDropdown}
              project={project}
              itemType='project'
              itemId={project._id}
              onAction={(actionId, id) => {
                if (actionId === "delete") {
                  deleteProject(id);
                }
                // Handle other actions like "rename", "share" here if needed
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
