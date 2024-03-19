import { createSlice} from "@reduxjs/toolkit";

export interface TodoState {
    todoItems: Array<object>
}
const initialState: TodoState = {
    todoItems: [],
}


const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todoItems = action.payload;
        },
        updateTodoOrder: (state, action) => {

        }
    },
})  



export default todoSlice.reducer;
export const { setTodos } = todoSlice.actions;
