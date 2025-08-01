import "./Preview.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForms } from "../../context/FormContext";
import UserForm from "../../components/userForm/UserForm";

const Preview = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [currentPageIndex, setCurrentPageIndex] =
    useState(0);

  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  const totalPages = formByID.pages.length;
  const currentPage = formByID.pages[currentPageIndex];

  if (!formByID) return <p>Loading preview...</p>;

  return (
    <div className='preview-container'>
      <div className='form-preview'>
        <UserForm
          currentPage={currentPage}
          title={formByID.title}
        />
        <div className='page-navigation'>
          <button
            onClick={() =>
              setCurrentPageIndex((prev) =>
                Math.max(prev - 1, 0)
              )
            }
            disabled={currentPageIndex === 0}
          >
            Previous
          </button>
          <span className='page-number'>
            {currentPageIndex + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPageIndex((prev) =>
                Math.min(prev + 1, totalPages - 1)
              )
            }
            disabled={currentPageIndex === totalPages - 1}
          >
            Next
          </button>
        </div>
        <button
          onClick={() => navigate(`/form-page/${formId}`)}
          className='back-to-edit'
        >
          Back to Edit
        </button>
      </div>
    </div>
  );
};

export default Preview;
