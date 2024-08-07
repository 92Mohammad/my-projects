import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoArray, BASE_URL, updateTodoTitleParameter } from "../../types/utils";
import { RootState} from '../../app/store'

export interface TodoState { 
    todos: TodoArray[];
}

const todoInitialValue: TodoState = {
    todos: [],
}


export const getTodos = createAsyncThunk('/todos/getTodos', async(_, {dispatch}) => {
    try {
        const response = await fetch(`${BASE_URL}/todo/getAllTodo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")!,
          },
        });
        if (response.status === 200) {
          const data = await response.json() as TodoArray[];
          dispatch(setTodos(data));
        }
    }
    catch (err: any) {
        console.error(err);
    }  
})

export const createTodo = createAsyncThunk('/todos/createTodo', async(title: string | undefined, {dispatch}) => {
    try {
        if (title !== "" && title !== undefined){
            console.log('title inside create todo: ',title)
          const response = await fetch(`${BASE_URL}/todo/createNewTodo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token")!,
            },
            body: JSON.stringify({
              task: title,
            }),
          }) ;
          const data = await response.json();
          if (response.status === 201) {
            
            // add new todo over here
            const newTodoItem: TodoArray = {
              todo_id: data.todo_id,
              task: title,
            }
            dispatch(addTodo(newTodoItem ));

          }
        }
    } catch (error) {
    console.log(error);
    }
  
})

export const updateTitle = createAsyncThunk('/todos/updateTitle', async({id, newTitle}: updateTodoTitleParameter, {dispatch,getState}) => {
    try{

        const res = await fetch(`${BASE_URL}/todo/updateTodoTitle`, {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token")!
            },
            body: JSON.stringify({
                todoId: id,
                title: newTitle
            })
        })
        if (res.status === 200){
            const state = getState() as RootState;
            const {todos} = state.todo;
            const updatedTodo = todos.map(todo => todo.todo_id === id ? {...todo, task: newTitle} : todo);
            dispatch(setTodos(updatedTodo));
        }

    }
    catch(err: unknown){
        console.log(err);
    }

})

export const deleteTodo = createAsyncThunk('/todos/deleteTodo', async(id: number, {dispatch, getState}) => {
    try {
        
        const response = await fetch(`${BASE_URL}/todo/deleteTodo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token")!,
            },
            body: JSON.stringify({
                todoId: id,
            }),
        });

        if (response.status === 202) {
            // filter the todos over here
            const state = getState() as RootState;
            const { todos } = state.todo;
            const remainingTodos = todos.filter(todo => todo.todo_id !== id);
            dispatch(setTodos(remainingTodos));
        }
    } catch (error) {
        console.error(error);
    }

})

export const todoSlice = createSlice({
    name: "todos",
    initialState: todoInitialValue,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoArray>) => {
            state.todos.push(action.payload);
        },
        setTodos: (state, action: PayloadAction<TodoArray[]>) => {
            state.todos = action.payload;
        },
    }
});

export default todoSlice.reducer;
export const { setTodos, addTodo } = todoSlice.actions;
