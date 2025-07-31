<div
  key={section.id}
  className='preview-section'
  style={{
    backgroundColor: section.backgroundColor || "#fff",
  }}
>
  {section.content.map((block) => {
    const { questionType, label, data } = block.data;
    console.log(block);
    console.log(questionType);
    console.log(label);
    console.log(data);
    return (
      // <div
      //   key={block.id}
      //   className='preview-question-block'
      // >
      //   <label className='preview-question'>
      //     {label}
      //   </label>

      //   {questionType === "Short Answer" && (
      //     <input
      //       type='text'
      //       disabled
      //       placeholder='Your answer'
      //     />
      //   )}

      //   {questionType === "Long Answer" && (
      //     <textarea
      //       disabled
      //       placeholder='Your answer'
      //     />
      //   )}

      //   {questionType === "Multiple Choice" &&
      //     data.options?.map((option, idx) => (
      //       <div key={idx}>
      //         <input
      //           type='radio'
      //           name={block.id}
      //           disabled
      //         />
      //         <label>{option}</label>
      //       </div>
      //     ))}

      //   {questionType === "Checkboxes" &&
      //     data.options?.map((option, idx) => (
      //       <div key={idx}>
      //         <input
      //           type='checkbox'
      //           disabled
      //         />
      //         <label>{option}</label>
      //       </div>
      //     ))}

      //   {questionType === "Dropdown" && (
      //     <select disabled>
      //       <option value=''>Select</option>
      //       {data.options?.map(
      //         (option, idx) => (
      //           <option
      //             key={idx}
      //             value={option}
      //           >
      //             {option}
      //           </option>
      //         )
      //       )}
      //     </select>
      //   )}

      //   {questionType === "Rating" && (
      //     <input
      //       type='range'
      //       min={data.scaleMin || 1}
      //       max={data.scaleMax || 5}
      //       disabled
      //     />
      //   )}

      //   {questionType === "Date" && (
      //     <input
      //       type='date'
      //       disabled
      //     />
      //   )}

      //   {questionType === "File Upload" && (
      //     <input
      //       type='file'
      //       disabled
      //     />
      //   )}
      // </div>
      <div></div>
    );
  })}
</div>;
