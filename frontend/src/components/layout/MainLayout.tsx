import { Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.ts";
import type { DecodedToken } from "../../types/user.types";
import { jwtDecode } from "jwt-decode";

const MainLayout = () => {
  const { setUserId, setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const hasToken = !!token && token !== "undefined" && token !== "";

  let decodedToken: DecodedToken | null = null;

  if (hasToken) {
    try {
      decodedToken = jwtDecode<DecodedToken>(token);
    } catch {
      decodedToken = null;
    }
  }

  const isValid = !!decodedToken?.userId && !!decodedToken?.userRole;

  useEffect(() => {
    if (!hasToken) {
      toast.error("You must be signed in to access this page");
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!isValid) {
      toast.error("Invalid token, please sign in again");
      localStorage.removeItem("token");
      navigate("/sign-in", { replace: true });
      return;
    }

    setUserId(decodedToken!.userId);
    setUserRole(decodedToken!.userRole);
  }, [hasToken, isValid, navigate, setUserId, setUserRole, decodedToken]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
