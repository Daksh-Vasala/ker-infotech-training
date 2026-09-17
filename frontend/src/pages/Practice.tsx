// import { Card, CardBody, CardText, CardTitle } from "reactstrap";

import { useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

// Card Component
// const Practice = () => {
//   return (
//     <>
//       <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center gap-5 ">
//         <h1>Bootstrap Practice</h1>
//         <h2 className="text-center">Dashboard layout</h2>
//         <div className="container">
//           <div className="row g-4">
//             {/* Sidebar */}
//             <div className="col-12 col-md-4 border">
//               <div className="row p-2 g-2">
//                 <p className="col-3 col-md-12 bg-secondary text-white rounded p-2 mb-0">
//                   Dashboard
//                 </p>
//                 <p className="col-3 col-md-12 bg-secondary text-white rounded p-2 mb-0">
//                   Tasks
//                 </p>
//                 <p className="col-3 col-md-12 bg-secondary text-white rounded p-2 mb-0">
//                   Users
//                 </p>
//                 <p className="col-3 col-md-12 bg-secondary text-white rounded p-2 mb-0">
//                   Settings
//                 </p>
//               </div>
//             </div>

//             {/* Main content */}
//             <div className="col-12 col-md-8 border">
//               <h3 className="mt-2">Main Content</h3>

//               <div className="row g-4 p-2">
//                 <div className="col-12 col-md-4 ">
//                   <Card className="shadow">
//                     <CardBody>
//                       <CardTitle className="text-muted mb-2">
//                         Total Users
//                       </CardTitle>

//                       <CardText className="fw-bold fs-3 mb-1">1,248</CardText>

//                       <CardText className="text-muted">
//                         Active accounts
//                       </CardText>
//                     </CardBody>
//                   </Card>
//                 </div>

//                 <div className="col-12 col-md-4 ">
//                   <Card className="shadow">
//                     <CardBody>
//                       <CardTitle className="text-muted mb-2">
//                         Pending tasks
//                       </CardTitle>

//                       <CardText className="fw-bold fs-3 mb-1">48</CardText>

//                       <CardText className="text-muted">
//                         Task awaiting completion
//                       </CardText>
//                     </CardBody>
//                   </Card>
//                 </div>
//                 <div className="col-12 col-md-4 ">
//                   <Card className="shadow">
//                     <CardBody>
//                       <CardTitle className="text-muted mb-2">
//                         Completed tasks
//                       </CardTitle>

//                       <CardText className="fw-bold fs-3 mb-1">86</CardText>

//                       <CardText className="text-muted">
//                         Tasks completed
//                       </CardText>
//                     </CardBody>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// Form

const Practice = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email) {
      emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError = "Invalid email";
    }

    if (!password) {
      passwordError = "Password is required";
    } else if (!passwordRegex.test(password)) {
      passwordError =
        "Use 8+ characters with uppercase, lowercase, number, and special character.";
    }

    setErrors({
      email: emailError,
      password: passwordError,
    });
  };

  return (
    <>
      <div className="d-flex min-vh-100 flex-column justify-content-center align-items-center">
        <h1 className="mb-3">Sign In</h1>

        <Form
          className="bg-light shadow p-4 rounded w-25"
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label className="" for="email">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              invalid={errors.email !== ""}
              placeholder="test@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  email: "",
                }));
              }}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              invalid={errors.password !== ""}
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  password: "",
                }));
              }}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Practice;
