import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormCreation } from "../../context/FormCreationContext";
import { useForms } from "../../context/FormContext";
import FormSidebar from "../../components/formSidebar/FormSidebar";
import FormCanvas from "../../components/formCanvas/FormCanvas";
import "./BuildFormPage.css";

function BuildFormPage() {
  const { formId } = useParams();
  const {
    pages,
    setActivePage,
    title,
    setFormTitle,
    addSectionToActivePage,
    createPageInForm,
    initializeFormState,
  } = useFormCreation();

  const { formByID, fetchFormsById } = useForms();

  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  useEffect(() => {
    if (formByID?._id) {
      initializeFormState(formByID);
    }
  }, [formByID]);

  return (
    <div className='form-builder'>
      <FormSidebar
        pages={pages}
        onAddPage={() => createPageInForm(formId)}
        onSelectPage={setActivePage}
      />
      <FormCanvas
        title={title}
        onTitleChange={setFormTitle}
        onAddSection={addSectionToActivePage}
      />
    </div>
  );
}

export default BuildFormPage;
