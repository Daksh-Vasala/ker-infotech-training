import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated =
    token?.trim() && token !== "undefined" && token !== "null";

  if (!isAuthenticated) {
    toast.error("Login to access this page");
    return <Navigate to={"/sign-in"} replace />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
