import { useParams } from "react-router-dom";
import "./Preview.css";
import { useForms } from "../../context/FormContext";
import { useEffect, useState } from "react";

const Preview = () => {
  const [form, setForm] = useState(null); // null instead of []
  const { formId } = useParams();
  const { fetchFormsById } = useForms();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFormsById(formId);
      setForm(data);
    };
    fetchData();
  }, [formId, fetchFormsById]);

  //   console.log(form);

  return <div>Preview</div>;
};

export default Preview;
