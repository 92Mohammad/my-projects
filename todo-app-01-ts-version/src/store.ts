import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/users/userSlice';
import todosSlice from './features/todos/todosSlice';


const store = configureStore({
    reducer: {
        users: userSlice,
        todos: todosSlice
    },
})
export default store;