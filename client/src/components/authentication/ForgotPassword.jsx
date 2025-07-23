import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import { toast } from "react-toastify";
const ForgotPassword = ({ email, setEmail }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/send-reset-password-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Something went wrong"
        );
      }
      toast.success("OTP sent successfully");
      sessionStorage.setItem("resetEmail", email);
      navigate("/otp");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-card forgot-password-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Welcome CANOVA 👋</h1>
        <p className='auth-subtitle'>
          Please enter your registered email ID to
          <br />
          receive an OTP
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <div className='form-group'>
          <label
            htmlFor='email'
            className='form-label'
          >
            E-mail
          </label>
          <input
            type='email'
            id='email'
            className='form-input'
            placeholder='Enter your registered email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='auth-button'
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
