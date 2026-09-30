import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import api from "../utils/api";
import { toast } from "react-toastify";
import FormModal from "../components/FormModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { TaskStatus, type Task, type TaskFormData } from "../types/tasks.types";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [status, setStatus] = useState<TaskStatus>();
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false);

  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) return;
      console.log("Error in fetching tasks: ", error);
      const message =
        error instanceof Error ? error.message : "Failed to fetch tasks";
      toast.error(message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({ title, description, status }: TaskFormData) => {
    if (!title || title === null || title === "") {
      return toast.error("Title is required");
    }
    try {
      setLoading(true);
      if (!isEdit) {
        const res = await api.post("/tasks", { title, description, status });
        toast.success(res.data.message || "Task created successfully");
      } else {
        const res = await api.put(`/tasks/${selectedTask!.id}`, {
          title,
          description,
          status,
        });
        toast.success(res.data.message || "Task updated successfully");
      }
      setIsOpenModal(false);
      await getTasks();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) return;
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      setLoading(true);
      const res = await api.delete(`/tasks/${taskToDelete.id}`);
      toast.success(res.data.message || "Deleted");
      setTaskToDelete(null);
      await getTasks();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) return;
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      await api.put(`/tasks/${selectedTask!.id}`, { status });
      await getTasks();
      toast.success("Status changed");
    } catch (error) {
      console.log("Error in changing status: ", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsOpenStatusModal(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <p className="text-primary text-uppercase small fw-bold mb-1">
              Workspace
            </p>
            <h1 className="h2 fw-bold mb-1">Tasks</h1>
            <p className="text-muted mb-0">
              Keep track of your work in one place.
            </p>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <span className="badge text-bg-white border rounded-pill px-3 py-2 text-dark">
              {tasks.length} task{tasks.length > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary rounded-pill px-3"
              onClick={() => {
                setIsOpenModal(true);
                setIsEdit(false);
              }}
            >
              + New task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center font-lg">Loading...</div>
        ) : (
          <div className="row g-4">
            {tasks.map((task) => (
              <div key={task.id} className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">{task.title}</h5>
                        <small className="text-muted">
                          User #{task.userId}
                        </small>
                      </div>
                      <select
                        className="form-select w-50"
                        value={task.status}
                        onChange={(e) => {
                          setSelectedTask(task);
                          setStatus(e.target.value as TaskStatus);
                          setIsOpenStatusModal(true);
                        }}
                      >
                        <option value={TaskStatus.PENDING}>Pending</option>
                        <option value={TaskStatus.INPROGRESS}>
                          In progress
                        </option>
                        <option value={TaskStatus.COMPLETED}>Completed</option>
                      </select>
                    </div>

                    <p className="text-secondary mb-4">{task.description}</p>

                    <div className="d-flex justify-content-between text-muted small border-top pt-3">
                      <span>Created: {task.createdAt}</span>
                      <span>Updated: {task.updatedAt}</span>
                    </div>
                  </div>

                  <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary rounded-pill flex-fill"
                        onClick={() => {
                          setSelectedTask(task);
                          setIsEdit(true);
                          setIsOpenModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger rounded-pill flex-fill"
                        onClick={() => setTaskToDelete(task)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FormModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        selectedTask={selectedTask}
        loading={loading}
      />
      <ConfirmationModal
        isOpen={taskToDelete !== null}
        title="Delete task?"
        message={`Are you sure you want to delete "${taskToDelete?.title ?? "this task"}"?`}
        loading={loading}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setTaskToDelete(null)}
      />
      <ConfirmationModal
        isOpen={isOpenStatusModal}
        title="Change status?"
        message={`Are you sure you want to change the status`}
        loading={loading}
        confirmLabel="Change"
        onConfirm={handleStatusChange}
        onCancel={() => setIsOpenStatusModal(false)}
      />
    </main>
  );
};

export default Tasks;
