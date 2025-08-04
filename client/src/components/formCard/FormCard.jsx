import { RiEdit2Fill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import "./FormCard.css";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { useForms } from "../../context/FormContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CLIENT_URL } from "../../utils/apiPaths";
const FormCard = ({ form }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
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
        {!form.isPublished && (
          <span style={{ color: "gray" }}> (Draft)</span>
        )}
      </div>
      <div
        className='form-link'
        onClick={() => {
          if (form.isPublished) {
            navigate(
              `${CLIENT_URL}/view-form/${form._id} `
            );
            toast.info(
              "This form is already published and can't be edited."
            );
          } else {
            navigate(`/form-page/${form._id}`);
          }
        }}
      >
        <div className='form-tab-body'>
          <RiEdit2Fill
            className='form-tab-icon'
            size={50}
          />
        </div>
      </div>
      <div
        className={`form-tab-footer ${
          !form.isPublished ? "no-analysis" : ""
        }`}
      >
        {form.isPublished && (
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
              access={form.access}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
