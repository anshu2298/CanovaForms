import { PiAtomBold } from "react-icons/pi";
import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <div className='app'>
      <div className='header'>
        <div className='logo'>
          <span className='logo-icon'>
            <PiAtomBold size={30} />
          </span>
          <span className='logo-text'>Formify</span>
        </div>
      </div>

      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
