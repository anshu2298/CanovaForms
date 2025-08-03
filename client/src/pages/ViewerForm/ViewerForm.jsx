import { useParams } from "react-router-dom";
import UserForm from "../../components/userForm/UserForm";
import { useForms } from "../../context/FormContext";
import { useEffect, useState } from "react";
import "./ViewerForm.css";

const ViewerForm = () => {
  const { id } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [
    wasConditionallyRouted,
    setWasConditionallyRouted,
  ] = useState(false);
  const [skippedPageId, setSkippedPageId] = useState(null);
  const [responses, setResponses] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] =
    useState(0);
  useEffect(() => {
    fetchFormsById(id);
  }, [id]);

  const handleNextPage = () => {
    if (
      currentPageIndex === 0 &&
      formByID.conditionalLogic?.conditions?.length > 0
    ) {
      const conditions =
        formByID.conditionalLogic.conditions;

      const allConditionsMatched = conditions.every(
        (cond) => {
          const userResponse = responses.find(
            (res) => res.questionId === cond.questionId
          );
          return (
            userResponse &&
            userResponse.answer === cond.answer
          );
        }
      );

      const truePageId =
        formByID.conditionalLogic.truePageId;
      const falsePageId =
        formByID.conditionalLogic.falsePageId;

      const targetPageId = allConditionsMatched
        ? truePageId
        : falsePageId;

      const targetPageIndex = formByID.pages.findIndex(
        (p) => p._id === targetPageId
      );

      if (targetPageIndex !== -1) {
        setCurrentPageIndex(targetPageIndex);
        setWasConditionallyRouted(true);
        setSkippedPageId(
          allConditionsMatched ? falsePageId : truePageId
        );
        return;
      }
    }

    const nextPageIndex = currentPageIndex + 1;

    if (
      wasConditionallyRouted &&
      formByID.pages[nextPageIndex]?._id === skippedPageId
    ) {
      setCurrentPageIndex(nextPageIndex + 1);
    } else {
      setCurrentPageIndex((prev) =>
        Math.min(prev + 1, totalPages - 1)
      );
    }
  };

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

  const handleResponseChange = (
    questionId,
    responseObj
  ) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.questionId === questionId
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = responseObj;
        return updated;
      } else {
        return [...prev, responseObj];
      }
    });
  };

  return (
    <div className='view-form-container'>
      <UserForm
        currentPage={currentPage}
        title={formByID.title}
        handleResponseChange={handleResponseChange}
      />
      <div className='viewer-navigation'>
        <button
          className='next-page-btn'
          onClick={handleNextPage}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ViewerForm;
