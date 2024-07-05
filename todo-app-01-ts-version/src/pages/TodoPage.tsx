import  { useEffect, useState} from "react";
import Header from "../components/Header";
import {Todo} from "../components/Todo";
import { useNavigate } from "react-router-dom";
import { getTodos, setTitle, createTodo } from "features/todos/todosSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch  } from "app/store";




export default function TodoPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {inputTitle, todos } = useSelector((state: RootState) => state.todos);
  
  
  
  
  useEffect((): void => {
    const token: string = localStorage.getItem("token")!
    if (!token){
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    getTodos();
  }, [])



  return (
    <>
      <Header isLogin={true} />
      <main className="todoPage">
        <div className="read-todo-section">
          <input
            type="text"
            placeholder="Enter new todo..."
            name="todo"
            value = {inputTitle}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            onKeyDown={(e) => {
              if (e.code === "Enter"){
                dispatch(createTodo(inputTitle))
              }
            }}
          />
          <button
            onClick={() => dispatch(createTodo(inputTitle))}
          >
            + Add Item
          </button>
        </div>

        <section className="todos-section">
            {todos.length === 0 ? (
                <h1>You have 0 todo item</h1>
            ) : (
                todos.map((todo,  index: number) => {
                  return <Todo
                      key={index}
                      title ={todo.task}
                      id={todo.todo_id}
                  />;
                })
            )}
        </section>
      </main>
    </>
  );
}
