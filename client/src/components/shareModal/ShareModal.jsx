import { AiOutlineShareAlt } from "react-icons/ai";
const ShareModal = ({ isOpen, onClose }) => {
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
      <div className='create-project-modal-content'>
        <div className='create-project-modal-header'>
          <div className='create-project-modal-icon'>
            <span>
              <AiOutlineShareAlt size={30} />
            </span>
          </div>
          <button
            className='create-project-modal-close'
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
