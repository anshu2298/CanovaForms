import { useNavigate } from "react-router-dom";
import "./FormSidebar.css";
import { LuAtom } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
function FormSidebar({ pages, onAddPage, onSelectPage }) {
  const navigate = useNavigate();
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
          {pages.map((page) => (
            <div
              key={page.id}
              className={`page-item ${
                page.active ? "active" : ""
              }`}
              onClick={() => onSelectPage(page.id)}
            >
              {page.name}
            </div>
          ))}
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
