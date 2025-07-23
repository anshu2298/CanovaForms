import "./Profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { LuAtom } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { CiFolderOn } from "react-icons/ci";
const Profile = () => {
  const { logout, user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPhotoModal, setShowPhotoModal] =
    useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(
    user.profileImageUrl
  );
  const [currentPage, setCurrentPage] = useState("profile");
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.phoneNumber,
    location: user.location,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoChange = (newPhoto) => {
    setCurrentPhoto(newPhoto);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/update-profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.mobile,
            location: formData.location,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully");
        refreshUser();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(
        "Something went wrong while updating your profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch(
        "http://localhost:3000/api/user/upload-profile-picture",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setCurrentPhoto(data.imageUrl);
        toast.success("Profile picture updated!");
        refreshUser();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "An error occurred while uploading the photo"
      );
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Logged out successfully");
        navigate("/", { replace: true });
        logout();
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error(error);
    }
  };

  return (
    <div className='profile-app'>
      {/* Sidebar */}
      <div className='profile-sidebar'>
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

        <div className='sidebar-profile'>
          <div className='profile-avatar'>
            <img
              src={user.profileImageUrl}
              alt='Profile'
              className='avatar-image'
            />
          </div>
          <div className='profile-info'>
            <div className='profile-name'>{user.name}</div>
            {/* <div className='profile-email'>
              {user.email}
            </div> */}
          </div>
        </div>

        <div className='sidebar-nav'>
          <div
            className={`profile-nav-item ${
              currentPage === "profile" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("profile")}
          >
            <RxPerson size={20} />
            <span className='profile-nav-text'>
              My Profile
            </span>
            <span className='profile-nav-arrow'>›</span>
          </div>
          <div
            className={`profile-nav-item ${
              currentPage === "settings" ? "active" : ""
            }`}
            onClick={() => setCurrentPage("settings")}
          >
            <FiSettings size={20} />
            <span className='profile-nav-text'>
              Settings
            </span>
            <span className='profile-nav-arrow'>›</span>
          </div>
          <div
            className='profile-nav-item logout'
            onClick={logoutHandler}
          >
            <IoMdLogOut size={20} />
            <span className='profile-nav-text'>
              Log Out
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='profile-main-content'>
        <div className='page-title'>
          <p>My Profile</p>
        </div>
        {/* My Profile */}
        {currentPage === "profile" && (
          <div className='profile-card'>
            <div className='profile-header'>
              <div className='profile-avatar-large'>
                <img
                  src={user.profileImageUrl}
                  alt='Profile'
                  className='avatar-image'
                />
                <div
                  className='edit-badge'
                  onClick={() => setShowPhotoModal(true)}
                >
                  <FiEdit3 size={18} />
                </div>
              </div>
              <div className='profile-details'>
                <div className='profile-name-large'>
                  {user.name}
                </div>
                <div className='profile-email-large'>
                  {user.email}
                </div>
              </div>
            </div>

            <div className='profile-form'>
              <div className='profile-form-group'>
                <label className='profile-form-label'>
                  Name
                </label>
                <input
                  type='text'
                  className='profile-form-input'
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange(
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className='profile-form-group'>
                <label className='profile-form-label'>
                  Email account
                </label>
                <input
                  type='email'
                  className='profile-form-input'
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange(
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className='profile-form-group'>
                <label className='profile-form-label'>
                  Mobile number
                </label>
                <input
                  type='text'
                  className='profile-form-input'
                  value={formData.mobile}
                  placeholder='Add number'
                  onChange={(e) =>
                    handleInputChange(
                      "mobile",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className='profile-form-group'>
                <label className='profile-form-label'>
                  Location
                </label>
                <input
                  type='text'
                  className='profile-form-input'
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange(
                      "location",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className='form-actions'>
              <button
                className='btn-save'
                onClick={handleProfileUpdate}
                disabled={loading}
              >
                Save Changes
              </button>
              <button
                className='btn-discard'
                onClick={() => {
                  setFormData({
                    name: user.name,
                    email: user.email,
                    mobile: user.phoneNumber,
                    location: user.location,
                  });
                  toast.info("Changes discarded");
                }}
              >
                Discard Changes
              </button>
            </div>
          </div>
        )}
        {/* Settings */}
        {currentPage === "settings" && (
          <div className='settings-section'>
            <h3 className='settings-section-title'>
              Preferences
            </h3>

            <div className='settings-group'>
              <div className='setting-item'>
                <label className='setting-label'>
                  Theme
                </label>
                <select className='setting-select'>
                  <option value='Light'>Light</option>
                  <option value='Dark'>Dark</option>
                  <option value='Auto'>Auto</option>
                </select>
              </div>

              <div className='setting-item'>
                <label className='setting-label'>
                  Language
                </label>
                <select className='setting-select'>
                  <option value='Eng'>Eng</option>
                  <option value='Esp'>Esp</option>
                  <option value='Fra'>Fra</option>
                  <option value='Deu'>Deu</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Photo Change Modal */}
      {showPhotoModal && (
        <div
          className='modal-overlay'
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className='modal-content'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='modal-header'>
              <h3>Change Profile Photo</h3>
              <button
                className='modal-close'
                onClick={() => setShowPhotoModal(false)}
              >
                ×
              </button>
            </div>

            <div className='modal-body'>
              <div className='current-photo'>
                <img
                  src={currentPhoto}
                  alt='Current profile'
                  className='current-photo-img'
                />
              </div>

              <div className='upload-section'>
                <input
                  type='file'
                  id='photo-upload'
                  accept='image/*'
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor='photo-upload'
                  className='upload-btn'
                >
                  <CiFolderOn size={22} /> Upload New Photo
                </label>
              </div>
            </div>

            <div className='modal-footer'>
              <button
                className='btn-save'
                disabled={loading}
                onClick={async () => {
                  await handlePhotoUpload(currentPhoto);
                  setShowPhotoModal(false);
                }}
              >
                Save
              </button>
              <button
                className='btn-cancel'
                onClick={() => setShowPhotoModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
