import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "reactstrap";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setModal(false);
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
        <div className="container">
          <h3>Tasks</h3>
          <Button color="danger" outline onClick={() => setModal(true)}>
            Logout
          </Button>
        </div>
      </nav>
      
      <ConfirmationModal
        isOpen={modal}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmLabel="Log out"
        onConfirm={handleLogout}
        onCancel={() => setModal(false)}
      />
    </>
  );
};

export default Navbar;
