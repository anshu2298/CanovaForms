import { useState } from "react";
import "./PublishModal.css";
import { IoCubeOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";
import { useForms } from "../../context/FormContext";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";

const PublishModal = ({ isOpen, onClose, form }) => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { shareForm } = useForms();

  const [saveToProject, setSaveToProject] =
    useState("Project");

  const [responders, setResponders] = useState("Anyone");
  const [
    showRespondersDropdown,
    setShowRespondersDropdown,
  ] = useState(false);
  const [
    showProjectnameDropdown,
    setShowProjectnameDropdown,
  ] = useState(false);
  const [showEditDropdown, setShowEditDropdown] =
    useState(null);
  const [mailEntries, setMailEntries] = useState([
    { id: Date.now(), email: "", access: "view" },
  ]);

  const handleEmailChange = (id, newEmail) => {
    setMailEntries(
      mailEntries.map((entry) =>
        entry.id === id
          ? { ...entry, email: newEmail }
          : entry
      )
    );
  };

  const handlePublish = async () => {
    try {
      const accessType =
        responders === "Anyone" ? "Anyone" : "Restricted";

      if (accessType === "Restricted") {
        for (const entry of mailEntries) {
          if (entry.email.trim()) {
            await shareForm(form._id, entry.email.trim());
          }
        }
      }

      const selectedProject = projects.find(
        (p) => p.name === saveToProject
      );

      if (selectedProject && selectedProject._id) {
        await fetch(
          API_PATHS.FORMS.MOVE_FORM_TO_PROJECT(form._id),
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              projectId: selectedProject._id,
            }),
          }
        );
      }

      const res = await fetch(
        API_PATHS.FORMS.PUBLISH_FORM(form._id),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            access: accessType,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        console.error("Error publishing form:", data.error);
        return;
      }
      toast.success("Form Published.");
    } catch (error) {
      console.error("Failed to publish form:", error);
      toast.error("Failed to publish form.");
    }
  };

  const handleResponderChange = (option) => {
    if (option === "Anyone") {
      setResponders("Anyone");
    } else {
      setResponders("Restricted");
    }
    setShowRespondersDropdown(false);
  };

  const addMailEntry = () => {
    const newEntry = {
      id: Date.now(),
      email: "Mail",
      access: "Edit",
    };
    setMailEntries([...mailEntries, newEntry]);
  };

  const removeMailEntry = (id) => {
    setMailEntries(
      mailEntries.filter((entry) => entry.id !== id)
    );
    setShowEditDropdown(null);
  };

  const toggleEditDropdown = (id) => {
    setShowEditDropdown(
      showEditDropdown === id ? null : id
    );
  };

  const changePermission = (id, newType) => {
    setMailEntries(
      mailEntries.map((entry) =>
        entry.id === id
          ? { ...entry, access: newType }
          : entry
      )
    );
    setShowEditDropdown(null);
  };

  const toggleRespondersDropdown = () => {
    setShowRespondersDropdown(!showRespondersDropdown);
  };

  const toggleProjectDropdown = () => {
    setShowProjectnameDropdown(!showProjectnameDropdown);
  };

  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={onClose}
    >
      <div
        className='publish-modal-content'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='publish-modal-header'>
          <div className='publish-header-left'>
            <div className='publish-publish-icon'>
              <IoCubeOutline size={20} />
            </div>
            <h2 className='publish-modal-title'>Publish</h2>
          </div>
          <button
            className='publish-close-button'
            onClick={onClose}
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        <div className='publish-modal-body'>
          <div className='publish-form-section'>
            <label className='publish-section-label'>
              Save to
            </label>
            <div className='publish-form-field publish-project-field'>
              <span className='publish-field-value'>
                {saveToProject}
              </span>
              <button
                onClick={toggleProjectDropdown}
                className='publish-action-link'
              >
                Change
              </button>
              {showProjectnameDropdown && (
                <div className='publish-project-dropdown-menu'>
                  {projects.map((project) => (
                    <button
                      key={project._id}
                      className='publish-dropdown-item'
                      onClick={() => {
                        setSaveToProject(project.name);
                        setShowProjectnameDropdown(false);
                      }}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='publish-form-section'>
            <label className='publish-section-label'>
              Responders
            </label>
            <div className='publish-form-field publish-responders-field'>
              <span className='publish-field-value'>
                {responders === "Anyone"
                  ? "Anyone with the link"
                  : "Restricted"}
              </span>
              <button
                className='publish-action-link'
                onClick={toggleRespondersDropdown}
              >
                {responders === "Anyone"
                  ? "Anyone"
                  : "Restricted"}
              </button>
              {showRespondersDropdown && (
                <div className='publish-dropdown-menu'>
                  <button
                    className={`publish-dropdown-item ${
                      responders === "Anyone with the Link"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleResponderChange("Anyone")
                    }
                  >
                    Anyone
                  </button>
                  <button
                    className={`publish-dropdown-item ${
                      responders === "Restricted"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleResponderChange("Restricted")
                    }
                  >
                    Restricted
                  </button>
                </div>
              )}
            </div>
          </div>

          {responders === "Restricted" && (
            <div className='publish-form-section'>
              <label className='publish-section-label'>
                Share
              </label>
              <div className='publish-share-entries'>
                <div className='publish-share-entry'>
                  <div className='publish-share-entry-left'>
                    <div className='publish-mail-avatar'>
                      <MdOutlineEmail size={20} />
                    </div>
                    <span className='publish-share-entry-email'>
                      {user.email}
                    </span>
                  </div>
                  <div className='publish-share-entry-actions'>
                    <p className='publish-share-entry-action'>
                      Owner
                    </p>
                  </div>
                </div>
                {mailEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className='publish-share-entry'
                  >
                    <div className='publish-share-entry-left'>
                      <div className='publish-mail-avatar'>
                        <MdOutlineEmail size={20} />
                      </div>
                      <input
                        className='publish-share-input-email'
                        placeholder='Mail.'
                        value={entry.email}
                        onChange={(e) =>
                          handleEmailChange(
                            entry.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className='publish-share-entry-actions'>
                      <button
                        className='publish-share-entry-action'
                        onClick={() =>
                          toggleEditDropdown(entry.id)
                        }
                      >
                        {entry.access}
                      </button>
                      {showEditDropdown === entry.id && (
                        <div className='publish-edit-dropdown-menu'>
                          <button
                            className='publish-edit-dropdown-item'
                            onClick={() =>
                              changePermission(
                                entry.id,
                                "Edit"
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className='publish-edit-dropdown-item'
                            onClick={() =>
                              changePermission(
                                entry.id,
                                "View"
                              )
                            }
                          >
                            View
                          </button>
                          <button
                            className='publish-edit-dropdown-item remove'
                            onClick={() =>
                              removeMailEntry(entry.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  className='publish-add-mails-button'
                  onClick={addMailEntry}
                >
                  + Add Mails
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='publish-modal-footer'>
          <button
            className='publish-button'
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
