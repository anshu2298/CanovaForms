import { useEffect, useState } from "react";
import "./QuestionTypes.css";

const allowedTypes = [
  { label: "image", value: "image/*" },
  { label: "pdf", value: "application/pdf" },
  { label: "ppt", value: "application/vnd.ms-powerpoint" },
  { label: "document", value: "application/msword" },
  { label: "video", value: "video/*" },
  { label: "zip", value: "application/zip" },
  { label: "audio", value: "audio/*" },
  {
    label: "spreadsheet",
    value: "application/vnd.ms-excel",
  },
];

const FileUpload = ({ questionData, onUpdate }) => {
  const [noOfFiles, setNoOfFiles] = useState(
    questionData.noOfFiles || 1
  );
  const [maxFileSize, setMaxFileSize] = useState(
    questionData.maxFileSize || 5
  );
  const [typeOfFile, setTypeOfFile] = useState(
    questionData.typeOfFile?.split(",") || []
  );

  // Handle checkbox toggle
  const toggleFileType = (value) => {
    setTypeOfFile((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  // Sync to parent on changes
  useEffect(() => {
    onUpdate?.({
      noOfFiles,
      maxFileSize,
      typeOfFile: typeOfFile.join(","),
    });
  }, [noOfFiles, maxFileSize, typeOfFile]);

  return (
    <div className='question-type'>
      <div className='file-selector'>
        <div className='file-info-row'>
          <div className='file-info-item'>
            <span className='label'>Number of Files:</span>
            <input
              type='number'
              min={1}
              className='file-stat-input'
              value={noOfFiles}
              onChange={(e) =>
                setNoOfFiles(parseInt(e.target.value) || 1)
              }
            />
          </div>

          <div className='file-types-row'>
            {allowedTypes
              .slice(0, 4)
              .map(({ label, value }) => (
                <div
                  className='file-type-item'
                  key={value}
                >
                  <span>{label}</span>
                  <input
                    type='checkbox'
                    checked={typeOfFile.includes(value)}
                    onChange={() => toggleFileType(value)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className='file-info-row'>
          <div className='file-info-item'>
            <span className='label'>Max File Size:</span>
            <input
              className='file-stat-input'
              type='number'
              min={1}
              value={maxFileSize}
              onChange={(e) =>
                setMaxFileSize(
                  parseInt(e.target.value) || 1
                )
              }
            />
          </div>

          <div className='file-types-row'>
            {allowedTypes
              .slice(4)
              .map(({ label, value }) => (
                <div
                  className='file-type-item'
                  key={value}
                >
                  <span>{label}</span>
                  <input
                    type='checkbox'
                    checked={typeOfFile.includes(value)}
                    onChange={() => toggleFileType(value)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
