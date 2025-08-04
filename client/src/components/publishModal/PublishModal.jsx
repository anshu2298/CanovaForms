import { useState } from "react";
import "./PublishModal.css";
import { IoCubeOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";

const PublishModal = ({ isOpen, onClose, onPublish }) => {
  const { user } = useAuth();
  const { projects } = useProjects();

  const [saveToProject, setSaveToProject] =
    useState("Project");

  const [responders, setResponders] = useState(
    "Anyone with the Link"
  );
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

  const handlePublish = () => {
    const emailData = mailEntries.map((entry) => ({
      email: entry.email,
      access: entry.access,
    }));
    onPublish({
      project: saveToProject,
      responders: responders,
      emails: emailData,
    });
  };

  const handleResponderChange = (option) => {
    if (option === "Anyone") {
      setResponders("Anyone with the Link");
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
                {responders}
              </span>
              <button
                className='publish-action-link'
                onClick={toggleRespondersDropdown}
              >
                {responders === "Anyone with the Link"
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
