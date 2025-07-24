import { useRef, useEffect } from "react";
import "./DropdownMenu.css";

function DropdownMenu({
  isOpen,
  onClose,
  onAction,
  itemId,
}) {
  const menuRef = useRef(null);

  const menuItems = [
    { id: "share", label: "Share" },
    { id: "rename", label: "Rename" },
    { id: "copy", label: "Copy" },
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
          onClick={() => handleItemClick(item.id)}
        >
          <span className='dropdown-label'>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default DropdownMenu;
