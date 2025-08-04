import { useRef, useEffect, useState } from "react";
import "./DropdownMenu.css";
import ShareModal from "../shareModal/ShareModal";
function DropdownMenu({
  isOpen,
  onClose,
  onAction,
  itemId,
  itemType,
  isSharing,
  setIsSharing,
  share,
}) {
  const [email, setEmail] = useState("");
  const menuRef = useRef(null);
  const menuItems = [
    { id: "share", label: "Share" },
    { id: "rename", label: "Rename" },
    { id: "delete", label: "Delete" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen, onClose]);

  const handleItemClick = async (actionId) => {
    if (actionId === "delete") {
      await onAction(actionId, itemId);
    } else {
      onAction(actionId, itemId);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className='dropdown-menu'
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`dropdown-item ${
            item.id === "delete" ? "danger" : ""
          }`}
          onClick={() => {
            if (item.id === "share") {
              setIsSharing(true);
              return;
            }
            handleItemClick(item.id);
          }}
        >
          <span className='dropdown-label'>
            {item.label}
          </span>
        </button>
      ))}
      <ShareModal
        itemType={itemType}
        onClose={() => {
          setIsSharing(false);
        }}
        isOpen={isSharing}
        email={email}
        setEmail={setEmail}
        share={() => share(itemId, email)}
        formDeployedLink={`https://canova-forms-frontend.vercel.app//view-form/${itemId}`}
      />
    </div>
  );
}

export default DropdownMenu;
