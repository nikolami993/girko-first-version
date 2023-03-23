import { useState } from "react";


const Forma = () =>{
  const [permissions,setPermissions] = useState([]);
  const [input, setInput] = useState('');


  const inputChange = (event)=>{
    setInput(event.target.value);
  }

  const handleCheck = (event) => {
    var permissions_array = [...permissions];
    if (event.target.checked) {
      permissions_array = [...permissions, event.target.id];
    } else {
      permissions_array.splice(permissions.indexOf(event.target.value), 1);
    }
    setPermissions(permissions_array);
    console.log(permissions_array);
  
  };
  const submitHandler = ()=>{
    //tu treba socket i kraj
  }


  return (
    <div className="App">
      <input
        type="checkbox"
        id="123"
        name="seats"
        onChange={handleCheck}
      />
      <label htmlFor="c1">Nikola</label>

      <input
        type="checkbox"
        id="888"
        name="seats"
        onChange={handleCheck}
      />
      <label htmlFor="c2">Marko</label>

      <input
        type="checkbox"
        id="555"
        name="seats"
        onChange={handleCheck}
      />
      <label htmlFor="c3">Violeta</label>

      <input
        type="checkbox"
        id="969"
        name="seats"
        onChange={handleCheck}
      />
      <label htmlFor="c4">Teodora</label><br/>
      <input type="text" placeholder="Unesi tekst" onChange={inputChange}/><br/>
      <button onClick={submitHandler}>Posalji</button>      
      <p>{permissions}</p>
      <p>{input}</p>
    </div>
  );
}
export default Forma;