import { useParams } from "react-router-dom";
import FormSidebar from "../../components/formSidebar/FormSidebar";
import { useEffect, useState } from "react";
import { useForms } from "../../context/FormContext";
import "./Publish.css";

import PublishModal from "../../components/publishModal/PublishModal";
import FlowChart from "../../components/flowChart/FlowChart";
const Publish = () => {
  const { formId } = useParams();
  const { fetchFormsById, formByID } = useForms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchFormsById(formId);
  }, [formId]);

  const formToFlowChartData = (form) => {
    const pages = form.pages.map((page) => page.name);

    const pageIdToIndex = {};
    form.pages.forEach((page, index) => {
      pageIdToIndex[page._id] = index;
    });

    const trueBranch = [];
    const falseBranch = [];

    const trueIndex =
      pageIdToIndex[form.conditionalLogic.truePageId];
    const falseIndex =
      pageIdToIndex[form.conditionalLogic.falsePageId];

    if (typeof trueIndex === "number")
      trueBranch.push(trueIndex);
    if (typeof falseIndex === "number")
      falseBranch.push(falseIndex);

    const trueBranchFlow = [];
    const falseBranchFlow = [];

    if (trueBranch.length > 0) {
      trueBranchFlow.push(trueBranch[0]);
      for (
        let i = trueBranch[0] + 1;
        i < pages.length;
        i++
      ) {
        if (i !== falseBranch[0]) {
          trueBranchFlow.push(i);
        }
      }
    }

    if (falseBranch.length > 0) {
      falseBranchFlow.push(falseBranch[0]);
      for (
        let i = falseBranch[0] + 1;
        i < pages.length;
        i++
      ) {
        if (i !== trueBranch[0]) {
          falseBranchFlow.push(i);
        }
      }
    }

    return {
      pages,
      trueBranchFlow,
      falseBranchFlow,
    };
  };

  const formData = formToFlowChartData(formByID);

  return (
    <div className='publish-page'>
      <FormSidebar pages={formByID.pages} />
      <div className='publish-canvas'>
        <div className='canvas-header'>
          <p className='canvas-title'>{formByID.title}</p>
        </div>
        <div className='publish-content'>
          <FlowChart formData={formData} />
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
        form={formByID}
      />
    </div>
  );
};

export default Publish;
