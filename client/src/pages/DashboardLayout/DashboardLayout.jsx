import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Header from "../../components/header/Header.jsx";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <div className='dashboard_app'>
      <Sidebar />
      <div className='dashboard_main-content'>
        <Header />
        <div className='content-container'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
