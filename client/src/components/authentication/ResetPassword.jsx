import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function ResetPassword({ email }) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        console.log(data.message || "Reset failed");
      }
    } catch (err) {
      console.log("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Create New Password</h1>
        <p className='auth-subtitle'>
          Today is a new day. It's your day. You shape it.
          <br />
          Sign in to start managing your projects.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <div className='form-group'>
          <label
            htmlFor='newPassword'
            className='form-label'
          >
            Enter New Password
          </label>
          <div className='password-input-container'>
            <input
              type={showNewPassword ? "text" : "password"}
              id='newPassword'
              className='form-input'
              placeholder='at least 8 characters'
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className='form-group'>
          <label
            htmlFor='confirmPassword'
            className='form-label'
          >
            Confirm Password
          </label>
          <div className='password-input-container'>
            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              id='confirmPassword'
              className='form-input'
              placeholder='at least 8 characters'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              )}
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='auth-button'
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
