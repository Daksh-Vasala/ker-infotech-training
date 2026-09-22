import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface TypeEmployee {
  id: number;
  name: string;
  department: string;
  salary: string;
}

const Practice = () => {
  const [employees, setEmployees] = useState<TypeEmployee[]>([
    {
      id: 1,
      name: "Daksh Vasala",
      department: "IT",
      salary: "25,000",
    },
    {
      id: 2,
      name: "Gwen stacy",
      department: "HR",
      salary: "50,000",
    },
    {
      id: 3,
      name: "Lionel Andres Messi",
      department: "BDE",
      salary: "30,000",
    },
  ]);

  const [cardModal, setcardModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<TypeEmployee | null>(
    null,
  );
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setName("");
    setDepartment("");
    setSalary("");
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const toggleCardModal = () => {
    setcardModal((prev) => !prev);
  };

  const toggleFormModal = () => {
    setFormModal((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  const startEditing = (e: TypeEmployee) => {
    setSelectedEmployee(e);
    setName(e.name);
    setDepartment(e.department);
    setSalary(e.salary);
    setIsEditing(true);
    toggleFormModal();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) {
      if (!name || !department || !salary) {
        toast.error("All fields are required");
        return;
      }

      setEmployees((prev) => {
        const nextId =
          prev.reduce((maxId, employee) => Math.max(maxId, employee.id), 0) + 1;

        return [
          ...prev,
          {
            id: nextId,
            name,
            department,
            salary,
          },
        ];
      });

      resetForm();
    } else {
      if (!name.trim() || !department.trim() || !salary.trim()) {
        toast.error("All fields are required");
        return;
      }

      setEmployees((prev) =>
        prev.map((e) =>
          e.id === selectedEmployee!.id
            ? {
                ...e,
                name: name.trim(),
                department: department.trim(),
                salary: salary.trim(),
              }
            : e,
        ),
      );

      resetForm();
    }

    toggleFormModal();
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    setSelectedEmployee(null);
    setDeleteModal(false);
  };

  return (
    <div className="bg-light min-vh-100">
      <nav className="d-flex flex-column flex-sm-row justify-content-between m-2 p-3 border-bottom bg-light">
        <h4>Navbar</h4>

        <div className="d-flex flex-column flex-sm-row  gap-sm-4">
          <p className="fw-semibold">Dashboard</p>
          <p className="fw-semibold">Employees</p>
          <p className="fw-semibold">Settings</p>
          <p className="fw-semibold">Sign out</p>
        </div>
      </nav>

      <main className="container py-4">
        <div className="pb-2 text-right w-100 d-flex justify-content-end">
          <Button
            color="primary"
            onClick={() => {
              resetForm();
              setFormModal(true);
            }}
          >
            Add Employee
          </Button>
        </div>
        <div className="row g-4">
          {employees.length <= 0 ? (
            <div className="text-center">No employees...</div>
          ) : (
            <>
              {employees.map((e) => (
                <div key={e.id} className="col-12 col-md-6 col-lg-4">
                  <Card className="border shadow-sm">
                    <CardBody>
                      <CardTitle className="text-center fw-bold">
                        {e.name}
                      </CardTitle>
                      <CardText className="text-center">
                        {e.department}
                      </CardText>
                      <CardText className="text-center">₹{e.salary}</CardText>
                    </CardBody>
                    <CardFooter className="d-flex gap-2 border-0">
                      <Button
                        color="secondary"
                        outline
                        className="w-100"
                        onClick={() => {
                          setSelectedEmployee(e);
                          setcardModal(true);
                        }}
                      >
                        View details
                      </Button>
                      <Button
                        color="primary"
                        outline
                        className="w-100"
                        onClick={() => {
                          startEditing(e);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        outline
                        className="w-100"
                        onClick={() => {
                          setSelectedEmployee(e);
                          setDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </>
          )}
          <Modal isOpen={cardModal} toggle={toggleCardModal}>
            <ModalHeader>{selectedEmployee?.name}</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="dark" outline onClick={toggleCardModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={formModal} toggle={toggleFormModal}>
            <ModalHeader>
              {isEditing ? "Edit employee" : "Add employee"}
            </ModalHeader>
            <ModalBody>
              <Form id="form" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="fw-semibold"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="IT"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="fw-semibold"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="salary">Salary</Label>
                  <Input
                    id="salary"
                    placeholder="50000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="fw-semibold"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" type="submit" form="form">
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  toggleFormModal();
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
            <ModalHeader>Are you sure to delete this ?</ModalHeader>
            <ModalFooter className="d-flex">
              <Button
                color="dark"
                outline
                className="w-100"
                onClick={() => {
                  if (selectedEmployee) {
                    handleDelete(selectedEmployee.id);
                  }
                }}
              >
                Yes
              </Button>
              <Button
                color="danger"
                outline
                className="w-100"
                onClick={toggleDeleteModal}
              >
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Practice;
