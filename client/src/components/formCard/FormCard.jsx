import { RiEdit2Fill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import "./FormCard.css";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { useForms } from "../../context/FormContext";
const FormCard = ({ form, draft }) => {
  const { deleteForm } = useForms();
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
      // await updateProject(project._id, {
      //   name: editedName,
      // });
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
        )}
      </div>
      <div className='form-tab-body'>
        <RiEdit2Fill
          className='form-tab-icon'
          size={50}
        />
      </div>
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
              onAction={(actionId, id) => {
                if (actionId === "delete") {
                  deleteForm(id);
                } else if (actionId === "rename") {
                  setIsRenaming(true);
                }
              }}
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
