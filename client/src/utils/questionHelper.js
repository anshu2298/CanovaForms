export const getInitialQuestionData = (
  questionType,
  existing = {}
) => {
  const base = {
    questionType,
    label: existing.label || "Your question here...",
    required: existing.required ?? false,
  };

  switch (questionType) {
    case "Short Answer":
      return {
        ...base,
        answer: "",
      };
    case "Long Answer":
      return {
        ...base,
        answer: "",
      };

    case "Multiple Choice":
      return {
        ...base,
        options: [],
      };
    case "Checkboxes":
      return {
        ...base,
        options: [],
      };
    case "Dropdown":
      return {
        ...base,
        options: [],
      };

    case "Linear Scale":
      return {
        ...base,
        scaleStart: 0,
        scaleEnd: 10,
        value: 5,
      };

    case "Rating":
      return {
        ...base,
        scale: 5,
        value: 0,
      };

    case "File Upload":
      return {
        ...base,
        noOfFiles: 1,
        maxFileSize: 5,
        typeOfFile: "*",
      };

    case "Date":
      return {
        ...base,
        date: "",
      };

    default:
      return base;
  }
};
