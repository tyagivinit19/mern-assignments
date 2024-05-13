import "./App.css";

interface Todo {
  title: string;
  description: string;
  done: boolean;
}

const Todo = (todo: Todo) => {
  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>{todo.done}</p>
    </div>
  );
};

function App() {
  return (
    <>
      <Todo title="Go to study" description="Study" done={false}></Todo>
    </>
  );
}

export default App;
