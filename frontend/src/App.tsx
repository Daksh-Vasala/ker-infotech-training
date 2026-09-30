import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Practice from "./practice/Practice";
import Tasks from "./pages/Tasks";
import MainLayout from "./components/layout/MainLayout";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/tasks" element={<Tasks />}></Route>
        </Route>
        <Route path="/practice" element={<Practice />}></Route>
      </Routes>
    </>
  );
}

export default App;
