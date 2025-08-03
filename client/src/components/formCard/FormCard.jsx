import { RiEdit2Fill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import "./FormCard.css";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { useForms } from "../../context/FormContext";
import { Link, useParams } from "react-router-dom";
const FormCard = ({ form, draft }) => {
  const { projectId } = useParams();
  const { deleteForm, updateForms, shareForm } = useForms();
  const [isSharing, setIsSharing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);
  const menuButtonRef = useRef(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editedName, setEditedName] = useState(
    form?.title || ""
  );
  if (!form) return null;
  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleRenameSubmit = async () => {
    if (editedName.trim() && editedName !== form.title) {
      await updateForms(form._id, editedName, projectId);
    }
    setIsRenaming(false);
  };

  return (
    <div className='form-tab-card'>
      <div className='form-tab-header'>
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
          <p className='project-title'>{form.title}</p>
        )}{" "}
        {form.isDraft && (
          <span style={{ color: "gray" }}> (Draft)</span>
        )}
      </div>
      <Link
        className='form-link'
        to={`/form-page/${form._id}`}
      >
        <div className='form-tab-body'>
          <RiEdit2Fill
            className='form-tab-icon'
            size={50}
          />
        </div>
      </Link>
      <div
        className={`form-tab-footer ${
          draft ? "no-analysis" : ""
        }`}
      >
        {!draft && (
          <button className='view-analysis-btn'>
            View Analysis
          </button>
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
              itemId={form._id}
              itemType='form'
              onAction={(actionId, id) => {
                if (actionId === "delete") {
                  deleteForm(id);
                } else if (actionId === "rename") {
                  setIsRenaming(true);
                } else if (actionId === "share") {
                  setIsDropdownOpen(false);
                  setIsSharing(true);
                }
              }}
              isSharing={isSharing}
              setIsSharing={setIsSharing}
              share={shareForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

{
  /* {draft && (
    <span style={{ color: "gray" }}> (Draft)</span>
    )} */
}
export default FormCard;
