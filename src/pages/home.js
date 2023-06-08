import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import ListViewer from "../components/ListViewer.js";
import { getAuth, signOut } from 'firebase/auth';
import { app,auth} from '../config/firebase.js';
import "./home.css"

function Home() {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate('/new')
  }
  const handleLogout = () => {    
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully');
        navigate('/signin')
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  

  return (
    <div>
      <Header></Header>
      <button onClick={handleClick}>
        +
      </button>
      <button onClick={handleLogout}>
        LogOut
      </button>
      <ListViewer/>
    </div>
  );
}

export default Home;
