import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";


interface userState {
    emailMessage: string,
    passwordMessage: string
}
const initialState: userState = {
    emailMessage: "",
    passwordMessage: ""
}

export const UserSignUp = createAsyncThunk('/user/UserSignUp', async() => {
    
})



const authSlice  = createSlice({
    name: "users",
    initialState,
    reducers: {
        userSignUp:(currentState, action) => {
            currentState.emailMessage = action.payload.message;
        },
        userLogin: (currentState, action) => {
            const { message } = action.payload;
            if (message === 'Email not found'){
                currentState.emailMessage = message;
            }
            else if(message === 'Incorrect! password'){
                currentState.passwordMessage = message;
            }
        },
        setMessages: (currentState, action) => {
            const { inputType } = action.payload;
            if (inputType === 'email'){
                currentState.emailMessage = "";
            }
            if (inputType === 'password'){
                currentState.passwordMessage = "";
            }
        }
    }
})


export default userSlice.reducer;

export const {userSignUp, userLogin, setMessages} = userSlice.actions;




