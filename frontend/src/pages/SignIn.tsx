import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { isEmailValid, isPasswordValid } from "../utils/validate";
import api from "../utils/api";
import { Link, useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Both fields are required");
    }

    if (!isEmailValid(email)) {
      return toast.error("Email is invalid");
    }

    if (!isPasswordValid(password)) {
      return toast.error("Password should contain atleast 6 characters");
    }
    signIn();
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/signin", { email, password });
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (error: unknown) {
      console.log("Error in signing in", error);
      toast.error(
        isAxiosError(error)
          ? error.response?.data?.message || "Unable to sign in"
          : "Unable to sign in",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h1 className="text-center mb-4 fw-bold text-black">Sign In</h1>

        <Card className="shadow border-0">
          <CardBody className="p-4 p-md-5">
            <Form onSubmit={handleSubmit} color="dark">
              <FormGroup className="mb-4">
                <Label for="email" className="fw-semibold">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="xavier@example.com"
                  className="py-2"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="password" className="fw-semibold">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="py-2"
                />
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                disabled={loading}
                className={`w-100 py-2 fw-semibold ${loading && "opacity-75"}`}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </CardBody>
        </Card>

        <p className="text-center text-muted  mt-4">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
