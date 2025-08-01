import { useParams } from "react-router-dom";
import UserForm from "../../components/userForm/UserForm";
import { useForms } from "../../context/FormContext";
import { useEffect, useState } from "react";
import "./ViewerForm.css";

const ViewerForm = () => {
  const { id } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [currentPageIndex, setCurrentPageIndex] =
    useState(0);
  useEffect(() => {
    fetchFormsById(id);
  }, [id]);

  if (
    !formByID ||
    !formByID.pages ||
    formByID.pages.length === 0
  ) {
    return (
      <div className='view-form-container'>Loading...</div>
    );
  }
  const totalPages = formByID.pages.length;
  const currentPage = formByID.pages[currentPageIndex];

  return (
    <div className='view-form-container'>
      <UserForm
        currentPage={currentPage}
        title={formByID.title}
      />
      <div className='viewer-navigation'>
        <button
          onClick={() =>
            setCurrentPageIndex((prev) =>
              Math.max(prev - 1, 0)
            )
          }
        >
          PREV
        </button>
        <button
          onClick={() =>
            setCurrentPageIndex((prev) =>
              Math.min(prev + 1, totalPages - 1)
            )
          }
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ViewerForm;
