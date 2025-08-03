import { AiOutlineShareAlt } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import "./ShareModal.css";
import { toast } from "react-toastify";
const ShareModal = ({
  isOpen,
  onClose,
  itemType,
  share,
  email,
  setEmail,
  formDeployedLink,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='create-project-modal-overlay'
      onClick={handleOverlayClick}
    >
      <div className='share-modal-content'>
        <div className='share-modal-header'>
          <div className='share-modal-icon'>
            <span className='share-modal-logo'>
              <AiOutlineShareAlt size={30} />
            </span>
            <p className='share-modal-title'>Share</p>
          </div>
          <button
            className='create-project-modal-close'
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className='share-modal-body'>
          {itemType === "form" && (
            <div>
              <p className='link-subtext'>
                copy link to share form
              </p>
              <div className='share-link-container'>
                <FaLink
                  onClick={() =>
                    window.open(formDeployedLink, "_blank")
                  }
                  style={{ cursor: "pointer" }}
                  size={23}
                  color='#69B5F8'
                />
                <p className='deployed-link'>
                  {formDeployedLink}
                </p>
              </div>
            </div>
          )}
          <div className='share-email-container'>
            <p className='share-text'>Share</p>
            <div className='share-input-wrapper'>
              <MdAttachEmail
                size={23}
                color='#69B5F8'
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='share-user-email'
                placeholder='Enter email to share'
              />
            </div>
          </div>
          <button
            className='share-button'
            onClick={() => {
              share();
              onClose();
              toast.success(
                itemType === "form"
                  ? "Form Shared"
                  : "Project Shared"
              );
            }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
