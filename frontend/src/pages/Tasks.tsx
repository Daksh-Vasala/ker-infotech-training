type TaskStatus = "pending" | "in_progress" | "completed";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Set up project dashboard",
    description:
      "Create the initial workspace layout and project summary cards.",
    status: "in_progress",
    userId: 101,
    createdAt: "2026-09-20",
    updatedAt: "2026-09-21",
  },
  {
    id: 2,
    title: "Prepare API documentation",
    description: "Document routes, request payloads, and expected responses.",
    status: "pending",
    userId: 101,
    createdAt: "2026-09-18",
    updatedAt: "2026-09-18",
  },
  {
    id: 3,
    title: "Deploy staging build",
    description: "Validate the production build and push the latest version.",
    status: "completed",
    userId: 101,
    createdAt: "2026-09-15",
    updatedAt: "2026-09-17",
  },
];

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-warning-subtle text-warning-emphasis",
  in_progress: "bg-primary-subtle text-primary-emphasis",
  completed: "bg-success-subtle text-success-emphasis",
};

const formatStatus = (status: TaskStatus) =>
  status.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

const Tasks = () => {
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
            >
              + New task
            </button>
          </div>
        </div>

        <div className="row g-4">
          {tasks.map((task) => (
            <div key={task.id} className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">{task.title}</h5>
                      <small className="text-muted">User #{task.userId}</small>
                    </div>
                    <span
                      className={`badge rounded-pill ${statusColors[task.status]}`}
                    >
                      {formatStatus(task.status)}
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
                      className="btn btn-sm btn-outline-primary rounded-pill flex-fill"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill flex-fill"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tasks;
