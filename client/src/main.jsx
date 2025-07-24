import { AuthProvider } from "./context/AuthContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProjectsProvider } from "./context/ProjectContext.jsx";
import { FormsProvider } from "./context/FormContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProjectsProvider>
      <FormsProvider>
        <App />
      </FormsProvider>
    </ProjectsProvider>
  </AuthProvider>
);
