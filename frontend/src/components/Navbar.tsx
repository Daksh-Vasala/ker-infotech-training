import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
        <div className="container">
          <h3>Tasks</h3>
          <Button
            color="danger"
            outline
            onClick={() => setModal(true)}
          >
            Logout
          </Button>
        </div>
      </nav>
      <Modal isOpen={modal}>
        <ModalHeader>Logout confirmation</ModalHeader>
        <ModalBody>Are you sure you want to logout ?</ModalBody>
        <ModalFooter>
          <Button className="btn-danger" onClick={handleLogout}>
            Yes
          </Button>
          <Button onClick={() => setModal(false)}>No</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Navbar;
