import { useLocation } from "react-router-dom";
import "./Header.css";
import { IoSearch } from "react-icons/io5";
import { useProjects } from "../../context/ProjectContext";
function Header() {
  const { setSearchQuery, searchQuery } = useProjects();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  return (
    <div className='dashboard_header'>
      {currentPath === "projects" ||
      currentPath === "forms" ? (
        <div className='search-container'>
          <div className='search-bar'>
            <input
              type='text'
              className='search-input'
              placeholder={
                currentPath === "projects"
                  ? "Search Projects..."
                  : "Search Forms..."
              }
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
            <button className='search-button'>
              <IoSearch size={20} />
            </button>
          </div>
        </div>
      ) : (
        <h1 className='dashboard_header-title'>
          Welcome to CANOVA
        </h1>
      )}
    </div>
  );
}

export default Header;
