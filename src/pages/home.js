import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import ListViewer from "../components/ListViewer.js";
import "./home.css"

function Home() {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate('/new')
  }

  return (
    <div>
      <Header></Header>
      <button onClick={handleClick}>
        +
      </button>
      <ListViewer/>
    </div>
  );
}

export default Home;
