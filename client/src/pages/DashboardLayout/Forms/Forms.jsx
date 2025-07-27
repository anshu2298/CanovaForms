import FormCard from "../../../components/formCard/FormCard";
import { useForms } from "../../../context/FormContext";
import "./Forms.css";
const Forms = () => {
  const { standaloneForms } = useForms();

  return standaloneForms.length === 0 ? (
    <p className='fallback-text'>No Forms available.</p>
  ) : (
    <div className='forms-grid'>
      {standaloneForms.map((form) => {
        return (
          <FormCard
            key={form._id}
            form={form}
          />
        );
      })}
    </div>
  );
};

export default Forms;
