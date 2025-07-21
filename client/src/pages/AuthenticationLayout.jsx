import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/authentication/Login";
import ForgotPassword from "../components/authentication/ForgotPassword";
import OTPVerification from "../components/authentication/OTPVerification";
import ResetPassword from "../components/authentication/ResetPassword";
import { PiAtomBold } from "react-icons/pi";
import { useState } from "react";

const AuthenticationLayout = () => {
  const [email, setEmail] = useState("");
  return (
    <div className='app'>
      <div className='header'>
        <div className='logo'>
          <span className='logo-icon'>
            <PiAtomBold size={30} />
          </span>
          <span className='logo-text'>CANOVA</span>
        </div>
      </div>

      <div className='main-content'>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/forgot-password'
            element={
              <ForgotPassword
                email={email}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path='/otp'
            element={<OTPVerification email={email} />}
          />
          <Route
            path='/reset-password'
            element={<ResetPassword email={email} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
