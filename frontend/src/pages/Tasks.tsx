const Tasks = () => {
  return (
    <main className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <div>
            <p className="text-primary text-uppercase small fw-bold mb-1">
              Workspace
            </p>
            <h1 className="h2 fw-bold mb-1">Tasks</h1>
            <p className="text-muted mb-0">
              Keep track of your work in one place.
            </p>
          </div>
          <span className="badge text-bg-white border text-dark rounded-pill px-3 py-2 align-self-start align-self-sm-center">
            1 task
          </span>
        </div>

        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="px-3 px-md-4 py-3">
                    Task
                  </th>
                  <th scope="col" className="py-3">
                    Status
                  </th>
                  <th scope="col" className="py-3">
                    Due date
                  </th>
                  <th scope="col" className="py-3 text-end px-3 px-md-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 px-md-4 py-4">
                    <div className="fw-semibold text-dark">
                      Set up project dashboard
                    </div>
                    <div className="small text-muted mt-1">
                      Organize the first set of project tasks.
                    </div>
                  </td>
                  <td>
                    <span className="badge text-bg-warning rounded-pill px-3 py-2">
                      In progress
                    </span>
                  </td>
                  <td className="text-muted">Today</td>
                  <td className="text-end px-3 px-md-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
