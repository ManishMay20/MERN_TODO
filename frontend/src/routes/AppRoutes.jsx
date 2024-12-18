import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import TodoDashboard from "../pages/TodoDashboard";
import ProtectedLayout from "../components/ProtectedLayout";

const AppRoutes = () => {
  // const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/todoDashboard" element={<TodoDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
