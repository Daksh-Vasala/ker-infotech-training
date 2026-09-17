import { Route, Routes } from "react-router"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Practice from "./pages/Practice"
import Tasks from "./pages/Tasks"


function App() {

  return(
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} ></Route>
        <Route path="/signup" element={<SignUp />} ></Route>
        <Route path="/tasks" element={<Tasks />} ></Route>
        <Route path="/practice" element={<Practice />} ></Route>
      </Routes>
    </>
  )
}

export default App
