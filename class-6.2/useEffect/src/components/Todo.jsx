import { useEffect, useState } from "react";
import axios from "axios";

function Todo({id}) {

    const [todo, setTodo] = useState([]);
    



    useEffect(()=> {
        axios.get('https://sum-server.100xdevs.com/todo?id='+id).then((response) => {
            console.log(response)
            setTodo(response.data.todo);
          });
    }, [id])


    return <>
        <h1>{todo.title}</h1>
        <h4>{todo.description}</h4>
    </>

}

export default Todo;