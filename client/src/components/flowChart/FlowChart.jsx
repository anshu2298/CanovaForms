import "./FlowChart.css";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const FlowChart = ({ formData }) => {
  const { pages, trueBranchFlow, falseBranchFlow } =
    formData;

  const renderBranch = (branch, branchType) => {
    return (
      <div className='branch'>
        {branch.map((pageIndex, index) => (
          <div
            key={`${branchType}-${pageIndex}`}
            className='branch-item'
          >
            <div className='page-box'>
              {pages[pageIndex]}
            </div>
            {index < branch.length - 1 && (
              <div className='vertical-connector'></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flowchart-container'>
      <div className='root-section'>
        <div className='page-box root-page'>{pages[0]}</div>

        <div className='decision-options'>
          <div className='option-group'>
            <div className='option-label'>
              <FaCheck />
              <span>True</span>
            </div>
          </div>
          <div className='option-group'>
            <div className='option-label'>
              <RxCross1 />
              <span>False</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connecting lines from root */}
      <div className='root-connectors'>
        <div className='connector-line left'></div>
        <div className='connector-line right'></div>
      </div>

      {/* Branches */}
      <div className='branches-container'>
        <div className='branch-section'>
          {renderBranch(trueBranchFlow, "true")}
        </div>

        <div className='branch-section'>
          {renderBranch(falseBranchFlow, "false")}
        </div>
      </div>
    </div>
  );
};

export default FlowChart;
