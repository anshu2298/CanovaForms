import "./FlowChart.css";

function Flowchart({ truePage, flasePage }) {
  return (
    <div className='flowchart-container'>
      <div className='dropdown-container'>
        <p className='page-box'>PAGE 01</p>
      </div>

      {/* Radio buttons */}
      <div className='radio-container'>
        <div className='radio-option'>TRUE</div>
        <div className='radio-option'>FALSE</div>
      </div>

      {/* Connecting lines and boxes */}
      <div className='flowchart-content'>
        {/* Vertical line from True */}
        <div className='line vertical-line-2'></div>

        {/* Horizontal line from False */}
        <div className='line horizontal-line-1'></div>

        {/* Vertical line from False horizontal */}
        <div className='line vertical-line-2'></div>

        {/* First level boxes */}
        <div className='page-box box-1'>Page 01</div>
        <div className='page-box box-2'>Page 01</div>

        {/* Second level connecting lines */}
        <div className='line vertical-line-3'></div>
        <div className='line vertical-line-4'></div>

        {/* Second level boxes */}
        <div className='page-box box-3'>Page 01</div>
        <div className='page-box box-4'>Page 01</div>

        {/* Third level connecting lines */}
        <div className='line vertical-line-5'></div>
        <div className='line vertical-line-6'></div>

        {/* Final level boxes */}
        <div className='page-box box-5'>Page 01</div>
        <div className='page-box box-6'>Page 01</div>
      </div>
    </div>
  );
}

export default Flowchart;
