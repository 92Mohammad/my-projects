import { MdEdit, MdDelete } from "react-icons/md";
import React, {useState, useRef, useEffect} from "react";
import { Reorder } from "framer-motion";
import { useSelector, useDispatch} from "react-redux";
import { setTodos} from "../features/todos/todosSlice";

export default function Todo(props) {
    const [edit, setEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(props.title);
    const [checkBox, setCheckBox] = React.useState(false);
    const todos = useSelector(state => state.todos.todoItems);

    const dispatch = useDispatch();
    function handleChange(event) {
        setCheckBox(event.target.checked);
    }
   async function updateTodoTitle() {
        try{
            const url = 'http://localhost:8000/updateTodo'
            const res = await fetch(url, {
                method: "POST",
                headers :{
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({
                    todoId: props.id,
                    title: editTitle
                })
            })

            if (res.status === 200){
                const data = await res.json();
                const updatedTodo = todos.map(todo => todo.todo_id === props.id ? {...todo, task: editTitle}: todo);
                dispatch(setTodos(updatedTodo));
                setEdit(false);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    const editTitleRef = useRef();

  const deleteTodo = async() => {
      try {
          const response = await fetch(
              "http://localhost:8000/deleteTodo",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      authorization: localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                      todoId: props.id,
                  }),
              }
          );
          if (response.status === 204) {
              // filter the todos over here
              const remainingTodos = todos.filter(todo => todo.todo_id !== props.id);
              dispatch(setTodos(remainingTodos));
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
                          ref ={editTitleRef}
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
                          {props.title}
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
