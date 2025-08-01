import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./authentication.css";
import { API_PATHS } from "../../utils/apiPaths";
function OTPVerification({ email }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        API_PATHS.AUTH.VERIFY_RESET_OTP,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("OTP verified successfully");
        navigate("/reset-password");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-card otp-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Enter Your OTP</h1>
        <p className='auth-subtitle'>
          We've sent a 6-digit OTP to your
          <br />
          registered mail.
          <br />
          Please enter it below to sign in.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <div className='form-group'>
          <label
            htmlFor='otp'
            className='form-label'
          >
            OTP
          </label>
          <input
            type='text'
            id='otp'
            className='form-input'
            placeholder='xxxx05'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength='6'
            required
          />
        </div>

        <button
          type='submit'
          className='auth-button'
          disabled={loading}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;
