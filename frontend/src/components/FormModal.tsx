import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { TaskStatus, type FormModalProps } from "../types/tasks.types";
import { useEffect, useState } from "react";

const FormModal = ({
  isOpenModal,
  setIsOpenModal,
  handleSubmit,
  isEdit,
  selectedTask,
  loading,
}: FormModalProps) => {
  const [title, setTitle] = useState(selectedTask?.title ?? "");
  const [description, setDescription] = useState(
    selectedTask?.description ?? "",
  );
  const [status, setStatus] = useState<TaskStatus>(
    selectedTask?.status ?? TaskStatus.PENDING,
  );

  useEffect(() => {
    // if (!isOpenModal) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(isEdit ? (selectedTask?.title ?? "") : "");
    setDescription(isEdit ? (selectedTask?.description ?? "") : "");
    setStatus(
      isEdit
        ? (selectedTask?.status ?? TaskStatus.PENDING)
        : TaskStatus.PENDING,
    );
  }, [isOpenModal, isEdit, selectedTask]);

  return (
    <Modal isOpen={isOpenModal}>
      <ModalHeader>{isEdit ? "Edit task" : "Add task"}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </FormGroup>

          <FormGroup className="d-flex flex-column min-vw-full">
            <Label htmlFor="description">Description</Label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <select
              disabled={loading}
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="form-select border-secondary shadow-sm"
            >
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.INPROGRESS}>In progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
            </select>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={loading}
          color="primary"
          onClick={() => handleSubmit({ title, description, status })}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button color="secondary" outline onClick={() => setIsOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormModal;
