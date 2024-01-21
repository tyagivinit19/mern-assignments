import { useState } from "react";
import Todo from "./components/Todo";



function App() {

  const [id, setId] = useState("1");

  function buttonClick(e) {
    console.log(e.target.innerHTML)
    setId(e.target.innerHTML)
  }

  return <>
    <button onClick={buttonClick}>1</button>
    <button onClick={buttonClick}>2</button>
    <button onClick={buttonClick}>3</button>

    <Todo id={id} />
  </>
}

export default App;