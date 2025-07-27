import { useState, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import "./FileUploadModal.css";
const FileUploadModal = ({
  isOpen,
  onClose,
  onFileSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragOver to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      // Check file size (200MB limit for videos)
      const maxSize = 200 * 1024 * 1024; // 200MB in bytes
      if (file.size > maxSize) {
        alert(
          `File "${file.name}" is too large. Maximum size is 200MB.`
        );
        return false;
      }
      return true;
    });

    setSelectedFiles(validFiles);
    if (onFileSelect) {
      onFileSelect(validFiles);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setIsDragOver(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={handleClose}
    >
      <div
        className='file-upload-modal-container'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='file-upload-modal-header'>
          <button
            className='file-upload-close-button'
            onClick={handleClose}
          >
            <IoCloseSharp size={20} />
          </button>
          <h2 className='file-upload-modal-title'>
            Upload
          </h2>
        </div>

        <div className='file-upload-modal-content'>
          <label className='file-upload-file-label'>
            File
          </label>

          <div
            className={`file-upload-upload-area ${
              isDragOver ? "file-upload-drag-over" : ""
            } ${
              selectedFiles.length > 0
                ? "file-upload-has-files"
                : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedFiles.length > 0 ? (
              <div className='file-upload-selected-files'>
                <LuUpload
                  size={48}
                  className='file-upload-upload-icon success'
                />
                <div className='file-upload-files-list'>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className='file-upload-file-item'
                    >
                      <span className='file-upload-file-name'>
                        {file.name}
                      </span>
                      <span className='file-upload-file-size'>
                        {(
                          file.size /
                          (1024 * 1024)
                        ).toFixed(2)}{" "}
                        MB
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className='file-upload-browse-button'
                  onClick={handleBrowseClick}
                >
                  Select different files
                </button>
              </div>
            ) : (
              <div className='file-upload-upload-content'>
                <LuUpload
                  size={48}
                  className='file-upload-upload-icon'
                />
                <h3 className='file-upload-upload-title'>
                  Drag & drop files to upload
                </h3>
                <p className='file-upload-upload-subtitle'>
                  Consider upto 200 mb per video
                </p>
                <div className='file-upload-separator'>
                  or
                </div>
                <button
                  className='file-upload-browse-button'
                  onClick={handleBrowseClick}
                >
                  Browse files
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type='file'
            multiple
            onChange={handleFileSelect}
            className='file-upload-file-input'
            accept='*/*'
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
