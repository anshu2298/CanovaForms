import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthenticationLayout from "./pages/AuthenticationLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/*'
          element={<AuthenticationLayout />}
        />
        {/* Later: Add protected routes or dashboard routes here */}
      </Routes>
    </Router>
  );
};

export default App;
