import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  if (isAuthenticated) {
    return navigate("/todoDashboard");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Todo App</h1>
      <p style={styles.description}>
        Organize your tasks, increase productivity, and keep track of your goals
        all in one place.
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/signin")}>
          Sign In
        </button>
        <button style={styles.button} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
