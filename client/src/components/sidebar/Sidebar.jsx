import "./Sidebar.css";
import { LuAtom } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { FaRegFolderClosed } from "react-icons/fa6";
import { IoBarChartOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const navItems = [
    {
      id: "",
      label: "Home",
      icon: <FiHome />,
      active: true,
    },
    {
      id: "analysis",
      label: "Analysis",
      icon: <IoBarChartOutline />,
      active: false,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FaRegFolderClosed />,
      active: false,
    },
  ];

  return (
    <div className='sidebar'>
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

      <nav className='sidebar-nav'>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(`/dashboard/${item.id}`);
            }}
            className={`nav-item ${
              currentPath === item.id ? "active" : ""
            }`}
          >
            <span className='nav-icon'>{item.icon}</span>
            <span className='nav-label'>{item.label}</span>
          </div>
        ))}
      </nav>

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

export default Sidebar;
