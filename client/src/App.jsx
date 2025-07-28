import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthenticationLayout from "./pages/AuthenticationLayout/AuthenticationLayout";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import Home from "./pages/DashboardLayout/Home/Home";
import Projects from "./pages/DashboardLayout/Projects/Projects";
import Analysis from "./pages/DashboardLayout/Analysis/Analysis";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import OTPVerification from "./components/authentication/OTPVerification";
import ResetPassword from "./components/authentication/ResetPassword";
import { useState } from "react";
import RedirectIfAuth from "./utils/RedirectIfAuth";
import RequireAuth from "./utils/RequiredAuth";
import ProjectDetailsPage from "./pages/DashboardLayout/ProjectDetailsPage/ProjectDetailsPage";
import BuildFormPage from "./pages/Forms/BuildFormPage";
import Forms from "./pages/DashboardLayout/Forms/Forms";
import Preview from "./pages/PreviewPage/Preview";

const App = () => {
  const [email, setEmail] = useState("");

  return (
    <Router>
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
        closeOnClick
      />
      <Routes>
        {/* Auth Routes */}
        <Route
          element={
            <RedirectIfAuth>
              <AuthenticationLayout />
            </RedirectIfAuth>
          }
        >
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
        </Route>

        {/* Dashboard Routes */}
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path='projects'
            element={<Projects />}
          />
          <Route
            path='/dashboard/projects/:projectId'
            element={<ProjectDetailsPage />}
          />
          <Route
            path='analysis'
            element={<Analysis />}
          />
          <Route
            path='forms'
            element={<Forms />}
          />
        </Route>

        {/* Form Route */}
        <Route
          path='/form-page/:formId'
          element={
            <RequireAuth>
              <BuildFormPage />
            </RequireAuth>
          }
        />
        <Route
          path='/preview/:formId'
          element={<Preview />}
        />

        {/* Profile route */}
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </Router>
  );
};

export default App;
