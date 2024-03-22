import {MdDelete, MdEdit} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
// import { useSelector, useDispatch} from "react-redux";
// import { setTodos} from "../features/todos/todosSlice";
import {TodoArray} from "pages/TodoPage";
import {RequestParameter} from 'pages/TodoPage'

type TodoProps = {
    id: number,
    title: string,
    todos:  TodoArray[],
    setTodos:  React.Dispatch<React.SetStateAction<TodoArray[]>>
    getAllTodo: () => Promise<void>,
    handleNewTodo: () =>  Promise<void>,
}

export default function Todo({id, title, todos, setTodos, getAllTodo, handleNewTodo}: TodoProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(title);
    const [checkBox, setCheckBox] = useState<boolean>(false);
    // const todos = useSelector(state => state.todos.todoItems);
    const editTitleRef = useRef<HTMLInputElement>(null);
    // const dispatch = useDispatch();
    function handleChange(event: React.FormEvent<EventTarget> ) {
        const {checked} = event.target as HTMLInputElement;
        setCheckBox(checked);
    }
   async function updateTodoTitle() {
        try{
            const url = 'http://localhost:8000/updateTodo'

            const updateTodoParameter: RequestParameter = {
                method: "POST",
                headers :{
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")!
                },
                body: JSON.stringify({
                    todoId: id,
                    title: editTitle
                })
            }

            const res = await fetch(url, updateTodoParameter)

            if (res.status === 200){
                console.log('inside 200')
                const data = await res.json();
                console.log('update todo response: ', data)
                const updatedTodo = todos.map(todo => todo.todo_id === id ? {...todo, task: editTitle} : todo);
                // dispatch(setTodos(updatedTodo));
                setTodos(updatedTodo)
                setEdit(false);
            }

        }
        catch(err: unknown){
            console.log(err);
        }
    }


  const deleteTodo = async() => {
      try {
          const deleteUrl = "http://localhost:8000/deleteTodo";
          const deleteParameter: RequestParameter = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("token")!,
              },
              body: JSON.stringify({
                  todoId: id,
              }),
          }
          const response = await fetch(deleteUrl, deleteParameter);
          if (response.status === 204) {
              // filter the todos over here
              const remainingTodos = todos.filter(todo => todo.todo_id !== id);
              // dispatch(setTodos(remainingTodos));
              setTodos(remainingTodos);
          }
      } catch (error) {
          console.error(error);
      }

  }

    useEffect(() => {
        editTitleRef.current?.focus();
    }, [edit]);
  return (

      <div
          className="todos--container"
          style={{backgroundColor: !checkBox ? "#9999ff" : "#ccccb3 "}}
      >
          <div className="left-tods-section">

              <input
                  type="checkbox"
                  name="isChecked"
                  checked={checkBox}
                  onChange={handleChange}
              />
              {
                  edit ? (
                      <input
                          ref = {editTitleRef}
                          className = "edit-title-input"
                          value = {editTitle}
                          type="text"
                          placeholder={"Edit todo..."}
                          onChange={(e) =>  setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                              if (e.code === "Enter" && editTitle !== " "){
                                  updateTodoTitle();
                              }
                          }}
                      />
                  ) : (
                      <p style={{textDecoration: checkBox ? "line-through" : "none"}}>
                          {title}
                      </p>
                  )
              }
          </div>
          <div className="right-tods-section">
          <MdEdit
                  className="edit-btn"
                  onClick = {() => setEdit(prevEdit => !prevEdit)}
              />
              <MdDelete
                  className="delete-btn"
                  onClick={() => deleteTodo()}
              />
          </div>
      </div>

  );
}
