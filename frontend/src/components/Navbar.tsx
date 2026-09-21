import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
      <div className="container">
        <h3>Tasks</h3>
        <button
          className="btn btn-outline-danger ms-auto px-4"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
