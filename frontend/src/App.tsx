import { Route, Routes } from "react-router"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


function App() {

  return(
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} ></Route>
        <Route path="/signup" element={<SignUp />} ></Route>
      </Routes>
    </>
  )
}

export default App
