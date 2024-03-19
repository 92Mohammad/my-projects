import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/users/userSlice';
import todosSlice from './features/todos/todosSlice';


export const store = configureStore({
    reducer: {
        users: userSlice,
        todos: todosSlice
    },
})


export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;