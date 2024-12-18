import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }
  return (
    <div className="flex justify-between w-4/5 m-auto my-4 text-2xl">
      <div>Profile icon</div>
      <div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg "
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
