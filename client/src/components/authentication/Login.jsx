import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [authState, setAuthState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      authState === "signup" &&
      password !== confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    const url =
      authState === "login"
        ? "http://localhost:3000/api/auth/login"
        : "http://localhost:3000/api/auth/register";

    const payload =
      authState === "login"
        ? { email, password }
        : { name, email, password };

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          authState === "login"
            ? "Login successful!"
            : "Registration successful!"
        );
        // TODO: redirect to dashboard or set auth context
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Welcome CANOVA 👋</h1>
        <p className='auth-subtitle'>
          Today is a new day. It's your day. You shape it.
          Sign in to start managing your projects.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='auth-form'
      >
        {authState === "signup" && (
          <div className='form-group'>
            <label
              htmlFor='name'
              className='form-label'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='form-input'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className='form-group'>
          <label
            htmlFor='email'
            className='form-label'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='form-input'
            placeholder='Example@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label
            htmlFor='password'
            className='form-label'
          >
            {authState === "login"
              ? "Password"
              : "Create Password"}
          </label>
          <div className='password-input-container'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              className='form-input'
              placeholder='at least 8 characters'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        {authState === "signup" && (
          <div className='form-group'>
            <label
              htmlFor='password'
              className='form-label'
            >
              Confirm Password
            </label>
            <div className='password-input-container'>
              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                id='password'
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
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
        )}
        {authState === "login" && (
          <div className='form-actions'>
            <p
              className='forgot-password-link'
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
          </div>
        )}

        <button
          type='submit'
          className='auth-button'
          disabled={loading}
        >
          {authState === "login" ? "Sign in" : "Sign up"}
        </button>

        <div className='auth-switch'>
          <span>
            {authState === "login"
              ? "Don't you have an account?"
              : "Already have an account?"}
          </span>
          <span
            type='button'
            className='switch-link'
            onClick={() =>
              setAuthState((prev) =>
                prev === "login" ? "signup" : "login"
              )
            }
          >
            {authState === "login" ? "Sign up" : "login"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
