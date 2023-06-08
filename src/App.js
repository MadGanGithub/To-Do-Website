import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.js";
import SignIn from "./pages/signin.js"
import SignUp from "./pages/signup.js"
import Newtask from "./pages/newtask.js";
import {LogProvider} from "./components/logcontext.js";
import Edit from "./pages/edit.js"


function App() {
  return (
  <>
  <LogProvider>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/new" element={<Newtask/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
    </Routes>
    </LogProvider>
  </>
  );
}

export default App;
