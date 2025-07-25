import "./Section.css";

function Section({ section }) {
  return (
    <div
      className='form-section'
      style={{
        backgroundColor:
          section.backgroundColor || "#ffffff",
        opacity: (section.backgroundOpacity ?? 100) / 100,
      }}
    >
      <div className='section-header'>
        <h4>Section ID: {section.id}</h4>
      </div>

      <div className='section-body'>
        {section.questions.length === 0 ? (
          <p>No questions yet. Start adding some!</p>
        ) : (
          section.questions.map((q, index) => (
            <div
              key={index}
              className='question-block'
            >
              {q.label}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Section;
