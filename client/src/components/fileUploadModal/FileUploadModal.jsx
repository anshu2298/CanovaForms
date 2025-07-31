import { useState, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import "./FileUploadModal.css";
import { useFormCreation } from "../../context/FormCreationContext";
import { ClockLoader } from "react-spinners";
const FileUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  type,
}) => {
  const { uploadToCloudinaryViaServer } = useFormCreation();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    const imageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    const videoTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];

    const isImage = imageTypes.includes(file.type);
    const isVideo = videoTypes.includes(file.type);

    if (!isImage && !isVideo) {
      alert(
        `Unsupported file type "${file.type}". Please upload an image or video.`
      );
      return;
    }

    const maxImageSize = 25 * 1024 * 1024; // 25MB
    const maxVideoSize = 200 * 1024 * 1024; // 200MB

    if (isImage && file.size > maxImageSize) {
      alert(
        `Image "${file.name}" is too large. Max size is 25MB.`
      );
      return;
    }

    if (isVideo && file.size > maxVideoSize) {
      alert(
        `Video "${file.name}" is too large. Max size is 200MB.`
      );
      return;
    }

    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      if (!selectedFile) return;
      const url = await uploadToCloudinaryViaServer(
        selectedFile
      );
      onUpload(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setIsDragOver(false);
    onClose?.();
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
              selectedFile ? "file-upload-has-files" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className='file-upload-selected-files'>
                <LuUpload
                  size={48}
                  className='file-upload-upload-icon success'
                />
                <div className='file-upload-file-item'>
                  <span className='file-upload-file-name'>
                    {selectedFile.name}
                  </span>
                  <span className='file-upload-file-size'>
                    {(
                      selectedFile.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </span>
                </div>
                {isUploading ? (
                  <ClockLoader color='white' />
                ) : (
                  <button
                    className='file-upload-browse-button'
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    Upload
                  </button>
                )}
              </div>
            ) : (
              <div className='file-upload-upload-content'>
                <LuUpload
                  size={48}
                  className='file-upload-upload-icon'
                />
                <h3 className='file-upload-upload-title'>
                  Drag & drop a file to upload
                </h3>
                <p className='file-upload-upload-subtitle'>
                  {type === "Image"
                    ? "Max size of Image is 20 MB"
                    : "Max size of Video is 200 MB"}
                </p>
                <div className='file-upload-separator'>
                  or
                </div>
                <button
                  className='file-upload-browse-button'
                  onClick={handleBrowseClick}
                >
                  Browse file
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type='file'
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
