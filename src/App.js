import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.js";
import SignIn from "./pages/signin.js"
import SignUp from "./pages/signup.js"
import Newtask from "./pages/newtask.js";
import Edit from "./pages/edit.js"
import Forgot from "./pages/forgot.js"

function App() {
  return (
  <>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Newtask />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/signin" element={<SignIn/>} />
        </Routes>
  </>
  );
}

export default App;
