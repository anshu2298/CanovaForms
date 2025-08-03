import { useParams } from "react-router-dom";
import FormSidebar from "../../components/formSidebar/FormSidebar";

import { useEffect } from "react";
import { useForms } from "../../context/FormContext";
import "./Publish.css";
const Publish = () => {
  const { formId } = useParams();
  const { fetchFormsById, formByID } = useForms();

  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  return (
    <div className='publish-page'>
      <FormSidebar pages={formByID.pages} />
      <div className='publish-canvas'>
        <div className='canvas-header'>
          <p className='canvas-title'>{formByID.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Publish;
