import { createSlice} from "@reduxjs/toolkit";

const initialState = {
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
