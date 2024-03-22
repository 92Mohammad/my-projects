import React, { useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
// import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
// import { setTodos } from "/features/todos/todosSlice";
// import { RootState } from "store";


export  interface TodoArray {
  todo_id: number,
  task : string
}

export interface RequestParameter {
  method: string,
  headers: HeadersInit,
  body?: string
}

export default function TodoPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const todos = useSelector((state: RootState) => state.todos.todoItems)
  const [todos, setTodos] = useState<TodoArray[]>([]);
  const [title, setTitle] = useState<string>("")
  const textRefElement = useRef();
  
  useEffect((): void => {
    const token: string = localStorage.getItem("token")!
    if (!token){
      navigate('/login');
    }
  }, [])



  const getAllTodo = async () => {
    try {
      const getTodoUrl: string = "http://localhost:8000/getAllTodo";
      const getTodoParameter : RequestParameter = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")!,
        },
      }
      const response = await fetch(getTodoUrl, getTodoParameter);
      if (response.status === 200){
        const data = await response.json() ;
        // dispatch(setTodos(data))
        setTodos(data);
      }
    } 
    catch (err) {
      console.error(err); 
    }
  };

  useEffect(() => {
    getAllTodo().then(r => console.log(r));
  }, []);

  const handleNewTodo = async() => {
    try {
      if (title !== ""){
        const url: string = "http://localhost:8000/createNewTodo";
        const newTodoParameter: RequestParameter = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")!,
          },
          body: JSON.stringify({
            task: title,
          }),
        }

        const response = await fetch(url, newTodoParameter) ;
        if (response.status === 201) {
          const data = await response.json();
          // add new todo over here
          const newTodoItem: TodoArray = {
            todo_id: data.todo_id,
            task: title,
          }

          // dispatch(setTodos([...todos, newTodoItem]))
          setTodos([...todos, newTodoItem]);
          setTitle("");
        }
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <Header isLogin={true} />
      <main className="todoPage">
        <div className="read-todo-section">
          <input
            type="text"
            placeholder="Enter new todo..."
            name="todo"
            value = {title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter"){
                handleNewTodo().then(r => console.log(r));
              }
            }}
          />
          <button
            onClick={() => handleNewTodo()}
          >
            + Add Item
          </button>
        </div>

        <section className="todos-section">
            {todos.length === 0 ? (
                <h1>You have 0 todo item</h1>
            ) : (
                todos.map((todo: TodoArray, index: number) => {
                  return <Todo
                      key={index}
                      title ={todo.task}
                      id={todo.todo_id}
                      getAllTodo={getAllTodo}
                      setTodos={setTodos}
                      todos = {todos}
                      handleNewTodo = {handleNewTodo}
                  />;
                })
            )}
        </section>
      </main>
    </>
  );
}
