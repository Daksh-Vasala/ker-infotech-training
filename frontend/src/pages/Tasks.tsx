import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import FormModal from "../components/FormModal";
import ConfirmationModal from "../components/ConfirmationModal";
import type { Task, TaskFormData } from "../types/tasks.types";

type TaskStatus = "pending" | "in_progress" | "completed";

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-warning-subtle text-warning-emphasis",
  in_progress: "bg-primary-subtle text-primary-emphasis",
  completed: "bg-success-subtle text-success-emphasis",
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      console.log(res.data);
      setTasks(res.data.data);
    } catch (error: unknown) {
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
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      const res = await api.delete(`/tasks/${taskToDelete.id}`);
      toast.success(res.data.message || "Deleted");
      setTaskToDelete(null);
      await getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
                      <span
                        className={`badge rounded-pill ${statusColors[task.status]}`}
                      >
                        {task.status}
                      </span>
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
      />
      <ConfirmationModal
        isOpen={taskToDelete !== null}
        title="Delete task?"
        message={`Are you sure you want to delete "${taskToDelete?.title ?? "this task"}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </main>
  );
};

export default Tasks;
