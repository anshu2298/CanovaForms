import { RiEdit2Fill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import "./FormCard.css";
import { useRef, useState } from "react";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
const FormCard = ({ draft }) => {
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
    <div className='form-tab-card'>
      <div className='form-tab-header'>
        <span className='form-tab-title'>
          Form Name{" "}
          {draft && (
            <span style={{ color: "gray" }}> (Draft)</span>
          )}
        </span>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
