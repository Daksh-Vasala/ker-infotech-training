import { useState } from "react";
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
import {
  isEmailValid,
  isPasswordValid,
  isPhoneValid,
  isUserNameValid,
} from "../utils/validate";
import { isAxiosError } from "axios";
import api from "../utils/api";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !email || !password || !phoneNumber) {
      return toast.error(
        "userName, email, password and phone number are required",
      );
    }

    if (!isUserNameValid(userName)) {
      return toast.error("userName must be 3-20 characters");
    }

    if (!isEmailValid(email)) {
      return toast.error("Email is invalid");
    }

    if (!isPasswordValid(password)) {
      return toast.error("Password should contain atleast 6 characters");
    }

    if (!isPhoneValid(phoneNumber)) {
      return toast.error("Phone number is invalid");
    }

    signup();
  };

  const signup = async () => {
    try {
      const res = await api.post("/auth/signup", {
        userName,
        email,
        password,
        phoneNumber,
        firstName,
        lastName
      });

      toast.success(res.data.message || "User signed up successfully");
    } catch (error) {
      console.log("Error in signup", error);
      toast.error(
        isAxiosError(error)
          ? error.response?.data?.message || "Unable to sign in"
          : "Unable to sign in",
      );
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h1 className="text-center mb-4 fw-bold">Sign Up</h1>

        <Card className="shadow border-0">
          <CardBody className="p-4 p-md-5">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                <Label for="userName" className="fw-semibold">
                  User name
                </Label>

                <Input
                  id="userName"
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="johndoe"
                  className="py-2"
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="email" className="fw-semibold">
                  Email
                </Label>

                <Input
                  id="email"
                  type="text"
                  required
                  value={email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="py-2"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="firstName" className="fw-semibold">
                  First name
                </Label>

                <Input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="py-2"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="lastName" className="fw-semibold">
                  Last name
                </Label>

                <Input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="py-2"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="phoneNumber" className="fw-semibold">
                  Phone number
                </Label>

                <Input
                  id="phoneNumber"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0987654321"
                  className="py-2"
                />
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                className="w-100 py-2 fw-semibold"
              >
                Sign Up
              </Button>
            </Form>
          </CardBody>
        </Card>

        <p className="text-center text-muted mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-decoration-none">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
