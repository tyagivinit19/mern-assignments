import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  const title = useRef(null);
  const description = useRef(null);

  const addTodo = () => {
    console.log(title.current.value)
    console.log(description.current.value)

    setTodos([...todos, { title: title.current.value, description: description.current.value }]);
    title.current.value = '';
    description.current.value = '';
  }


  return (
    <>
      <div><label htmlFor="title">Title</label><input type="text" ref={title} /></div>
      <div><label htmlFor="description">Description</label><input type="description" ref={description} /></div>
      <div><button type="button" onClick={addTodo}>Add</button></div>
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <p>Title: {todo.title}</p>
            <p>Description: {todo.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
