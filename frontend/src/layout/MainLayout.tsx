import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (
    !isAuthenticated ||
    isAuthenticated === "undefined" ||
    isAuthenticated === null ||
    isAuthenticated === ""
  ) {
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
