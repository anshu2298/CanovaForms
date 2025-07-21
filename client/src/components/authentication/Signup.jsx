import { useState } from "react";

function Signup({ onViewChange }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle signup logic here
    console.log("Signup attempt:", {
      name,
      email,
      password,
    });
  };

  return (
    <div className='auth-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Welcome CANOVA 👋</h1>
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
            Create Password
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
              {showPassword ? "👁️" : "👁️‍🗨️"}
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
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='auth-button'
        >
          Sign up
        </button>

        <div className='auth-switch'>
          <span>Do you have an account? </span>
          <button
            type='button'
            className='switch-link'
            onClick={() => onViewChange("login")}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
