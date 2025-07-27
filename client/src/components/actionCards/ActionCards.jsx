import { useState } from "react";
import "./ActionCards.css";
import { IoFolderOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import CreateProjectModal from "../createProjectModal/CreateProjectModal";
import { useNavigate } from "react-router-dom";
import { useForms } from "../../context/FormContext";
function ActionCards() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createStandaloneForm } = useForms();
  const actions = [
    {
      id: "start-scratch",
      title: "Start From scratch",
      description: "Create your first Project now",
      icon: <IoFolderOutline />,
      onClick: () => setIsModalOpen(true),
    },
    {
      id: "create-form",
      title: "Create Form",
      description: "Create your first Form now",
      icon: <RiEdit2Fill />,
      onClick: () => createStandaloneForm(navigate),
    },
  ];

  return (
    <>
      <div className='action-cards'>
        {actions.map((action) => (
          <div
            key={action.id}
            className='action-card card'
            onClick={action.onClick}
          >
            <div className='icon large blue'>
              {action.icon}
            </div>
            <h3 className='action-title'>{action.title}</h3>
            <p className='action-description'>
              {action.description}
            </p>
          </div>
        ))}
      </div>{" "}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ActionCards;
