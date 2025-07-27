import { useFormCreation } from "../../context/FormCreationContext";
import Question from "../question/Question";
import "./Section.css";

function Section({ section, pageId }) {
  const { setActiveSection } = useFormCreation();

  return (
    <div
      className={`form-section ${
        section.active ? "active" : ""
      }`}
      style={{
        backgroundColor:
          section.backgroundColor || "#ffffff",
        opacity: (section.backgroundOpacity ?? 100) / 100,
      }}
    >
      <div className='section-header'>
        <input
          type='checkbox'
          checked={section.active}
          onChange={() =>
            setActiveSection(pageId, section.id)
          }
        />
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
