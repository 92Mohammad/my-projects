import  { useEffect, useRef} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getTodos,  createTodo } from "../features/todos/todosSlice";
import { useAppDispatch  } from "../app/store";
import { TodoList } from "../components/TodoList";

export default function TodoPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inputTitleRef = useRef<HTMLInputElement>(null);


  useEffect((): void => {
    const token: string = localStorage.getItem("token")!
    if (!token){
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    dispatch(getTodos());
  }, [])

  const handleCreateTodo = () => {
    dispatch(createTodo(inputTitleRef.current?.value))
    if (inputTitleRef.current !== null){
      inputTitleRef.current.value = ""
    }
  }

  return (
    <>
      <Header isLogin={true} />
      <main className="todoPage" style = {{backgroundColor: "#0b1120"}}>
        <div className="read-todo-section">
          <input
            ref = {inputTitleRef}
            type="text"
            placeholder="Enter new todo..."
            name="todo"
            onKeyDown={(e) => {
              if (e.code === "Enter"){
                handleCreateTodo();
              }
            }}
          />
          <button
            onClick={() => handleCreateTodo()}
          >
            + Add Item
          </button>
        </div>

        <section className="todos-section">
          <TodoList/>
        </section>
      </main>
    </>
  );
}
