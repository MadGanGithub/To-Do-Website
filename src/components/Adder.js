import { useState } from "react";

const Adder=()=>{

    const [add,setAdd]=useState("")

    const onAddClick=(e)=>{
        e.preventDefault()
    }

    const onInputChange=(e)=>{
        setAdd(e.target.value)
    }

    return(
        <div>        
        <form className="input_form" onSubmit={onAddClick}>
            <input className="input" 
            placeholder="New TO-DO......."
            onChange={onInputChange}
            />
            <button className="plus" type="submit">+ Add</button>
        </form>
        </div>
    
    )
}

export default Adder;