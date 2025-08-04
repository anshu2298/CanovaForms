import { useParams } from "react-router-dom";
import FormSidebar from "../../components/formSidebar/FormSidebar";

import { useEffect, useState } from "react";
import { useForms } from "../../context/FormContext";
import "./Publish.css";
import Flowchart from "../../components/flowChart/FlowChart";
import PublishModal from "../../components/publishModal/PublishModal";
const Publish = () => {
  const { formId } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  const handlePublish = (data) => {
    console.log("Publishing with data:", data);
    setIsModalOpen(false);
    // Add your publish logic here
  };

  return (
    <div className='publish-page'>
      <FormSidebar pages={formByID.pages} />
      <div className='publish-canvas'>
        <div className='canvas-header'>
          <p className='canvas-title'>{formByID.title}</p>
        </div>
        <div className='publish-content'>
          <Flowchart />
        </div>
        <button
          className='next-publish'
          onClick={() => setIsModalOpen(true)}
        >
          NEXT
        </button>
      </div>
      <PublishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default Publish;
