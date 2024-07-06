import { useSelector } from "react-redux";
import { RootState } from '../app/store'
import { Todo } from "./Todo";

export const TodoList = () => {
    const { todos} = useSelector((state: RootState) => state.todo);

    return (
        <>
            { todos.length === 0 ? (
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
        </>
    )
}