import { useNavigate } from "react-router";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      {/* Simple Centered Card */}
      <div
        className="card border-0 shadow-lg p-4 p-md-5 text-center"
        style={{ maxWidth: "500px", borderRadius: "16px" }}
      >
        {/* Simple App Icon */}
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle shadow-sm"
          style={{ width: "60px", height: "60px", fontSize: "24px" }}
        >
          ✓
        </div>

        {/* Header */}
        <h1 className="fw-bold text-dark mb-2">TaskManager</h1>
        <p className="text-secondary mb-4">
          A simple & easy way to organize your daily tasks and stay productive.
        </p>

        {/* Action Button */}
        <button
          className="btn btn-primary btn-lg fw-semibold shadow-sm w-100 mb-3"
          onClick={() => navigate("/sign-in")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
