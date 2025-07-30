import FormCard from "../../../components/formCard/FormCard";
import { useForms } from "../../../context/FormContext";
import "./Forms.css";
const Forms = () => {
  const { filteredForms } = useForms();

  return filteredForms.length === 0 ? (
    <p className='fallback-text'>No Forms available.</p>
  ) : (
    <div className='forms-grid'>
      {filteredForms.map((form) => {
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
