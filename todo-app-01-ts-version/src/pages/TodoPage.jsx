import React, { useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Todo from "../components/Todo";
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setTodos } from "../features/todos/todosSlice";



export default function TodoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todoItems)

  const textRefElement = useRef();
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token){
      navigate('/login');
    }
  }, [])



  const getAllTodo = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllTodo", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      dispatch(setTodos(data))
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

      const inputText = textRefElement.current.value;
      if (inputText !== ""){
        const response = await fetch("http://localhost:8000/createNewTodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            task: inputText,
          }),
        });
        if (response.status === 201) {
          // await getAllTodo();
          // add new todo over here
          const newTodoItem = {
            todo_id: response.todo_id,
            task: inputText,
          }

          dispatch(setTodos([...todos, newTodoItem]))
          // console.log('new todos', newTodos);
          textRefElement.current.value = "";
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
            ref = {textRefElement}
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
                todos.map((todo, index) => {
                  return <Todo
                      key={index}
                      title ={todo.task}
                      id={todo.todo_id}
                      getAllTodo={getAllTodo}
                      todo = {todo}
                      handleNewTodo = {handleNewTodo}
                  />;
                })
            )}
        </section>
      </main>
    </>
  );
}
