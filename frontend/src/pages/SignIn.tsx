import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password
    });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h1 className="text-center mb-4 fw-bold">Sign Up</h1>

        <Card className="shadow border-0">
          <CardBody className="p-4 p-md-5">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                <Label for="email" className="fw-semibold">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
          Don't have an account?{" "}
          <a href="/signup" className="text-decoration-none">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
