import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
    emailMessage: "",
    passwordMessage: ""
}

const userSlice  = createSlice({
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




