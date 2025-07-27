import "./FormSidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import { LuAtom } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiLineVerticalLight } from "react-icons/pi";
import { useFormCreation } from "../../context/FormCreationContext";

function FormSidebar({ pages, onAddPage, onSelectPage }) {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { deletePageFromForm } = useFormCreation();
  return (
    <div className='form-sidebar'>
      <div className='sidebar-header'>
        <div
          className='logo'
          onClick={() => navigate("/dashboard")}
        >
          <span className='logo-icon'>
            <LuAtom />
          </span>
          <span className='logo-text'>CANOVA</span>
        </div>
      </div>

      <div className='pages-section'>
        <div className='pages-list'>
          {pages.map((page, index) => {
            return (
              <div
                key={page._id || index}
                className={`page-item ${
                  page.active ? "active" : ""
                }`}
              >
                <p
                  onClick={() => onSelectPage(page._id)}
                  className='page-name'
                >{`Page ${String(index + 1).padStart(
                  2,
                  "0"
                )}`}</p>
                <PiLineVerticalLight />
                <RiDeleteBin6Line
                  onClick={() =>
                    deletePageFromForm(formId, page._id)
                  }
                  size={20}
                  className={`delete-icon ${
                    page.active ? "active" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
        <button
          className='add-page-btn'
          onClick={onAddPage}
        >
          <span className='add-icon'>+</span>
          Add new Page
        </button>
      </div>

      <div className='sidebar-footer'>
        <div
          className='nav-item'
          onClick={() => {
            navigate("/profile");
          }}
        >
          <span className='nav-icon'>
            <IoPerson />
          </span>
          <span className='nav-label'>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default FormSidebar;
