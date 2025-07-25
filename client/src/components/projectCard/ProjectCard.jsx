import "./ProjectCard.css";
import { IoFolderOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import ShareModal from "../shareModal/ShareModal";
function ProjectCard({ project }) {
  const { deleteProject, updateProject } = useProjects();
  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editedName, setEditedName] = useState(
    project.name
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleRenameSubmit = async () => {
    if (editedName.trim() && editedName !== project.name) {
      await updateProject(project._id, editedName);
    }
    setIsRenaming(false);
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
        {isRenaming ? (
          <input
            className='rename-input'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRenameSubmit();
              }
            }}
            autoFocus
          />
        ) : (
          <p className='project-title'>{project.name}</p>
        )}
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
              itemId={project._id}
              onAction={(actionId, id) => {
                if (actionId === "delete") {
                  deleteProject(id);
                } else if (actionId === "rename") {
                  setIsRenaming(true);
                } else if (actionId === "share") {
                  setIsModalOpen(true);
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
            />
          )}
          <ShareModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
