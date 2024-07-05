import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TodoArray, BASE_URL, updateTodoTitleParameter } from "types/utils";
import { RootState} from '../../app/store'
export interface TodoState { 
    todos: TodoArray[];
    inputTitle: string;
    edit: boolean
}

const todoInitialValue: TodoState = {
    todos: [],
    inputTitle: "",
    edit: false
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

export const createTodo = createAsyncThunk('/todos/createTodo', async(title: string, {dispatch}) => {
    try {
        if (title !== ""){

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
          if (response.status === 201) {
            const data = await response.json();
            // add new todo over here
            const newTodoItem: TodoArray = {
              todo_id: data.todo_id,
              task: title,
            }
            dispatch(addTodo(newTodoItem ));
            dispatch(setTitle(""));

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
            const data = await res.json();
            console.log('update todo response: ', data)
            const state = getState() as RootState;
            const {todos} = state.todos;
            const updatedTodo = todos.map(todo => todo.todo_id === id ? {...todo, task: newTitle} : todo);
            dispatch(setTodos(updatedTodo));
            dispatch(setEdit(false))
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
            const { todos } = state.todos;
            const remainingTodos = todos.filter(todo => todo.todo_id !== id);
            console.log('all remaining todos after deletion: ', remainingTodos)
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
        setTitle: (state, action: PayloadAction<string>) => {
            state.inputTitle = action.payload;
        },
        setEdit: (state, action: PayloadAction<boolean>) => {
            state.edit = action.payload
        }
    }
});


export const { setTodos, addTodo, setTitle, setEdit } = todoSlice.actions;
export default todoSlice.reducer;