import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, UserSignUpParameter} from '../../types/utils'

// state must be exported
export interface userState {
    emailMessage: string,
    passwordMessage: string;
    success: boolean
}
const initialState: userState = {
    emailMessage: "",
    passwordMessage: "",
    success: false
}

export const UserSignUp = createAsyncThunk('/user/UserSignUp', async({email, password}: UserSignUpParameter,  {dispatch}) => {

      try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        }); 
        
        const data = await response.json();
        return data;
      }
    catch(error){
        console.log(error);
    } 
});

export const LogIn = createAsyncThunk('/user/LogIn', async({email, password}: UserSignUpParameter) => {
    try {
        const url: string = `${BASE_URL}/auth/login`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        const data: any = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    } 
})

export const LogOut = createAsyncThunk('/user/LogOut', async() => {

    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                authorization : localStorage.getItem("token")!,
            }
        })
    
        const data = await response.json()
        if (response.status === 200){
            console.log('logout...')
            localStorage.removeItem("token");
            window.location.href = '/'
        }
        console.log('this is logout response; ', data)
    }
    catch(error: any){
        console.log("Error occurred: ", error.message)
    }

})

export const userSlice = createSlice({
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
    },
    extraReducers: (builder) => {
        builder.addCase(UserSignUp.pending, (state, action) => {
            console.log('pending')
            state.success = false;
        })
        builder.addCase(UserSignUp.fulfilled, (state, action) => {
            console.log('fullfiled')
            console.log(action.payload);
            state.success = true;
        })
        builder.addCase(LogIn.pending, (state, action) => {
            console.log('pending');
            state.success = false;
        })
        builder.addCase(LogIn.fulfilled, (state, action) => {
            state.success = true;
            console.log('fulfilled: ', action.payload);
            localStorage.setItem("token", action.payload.token);
        })
    }

});

export default userSlice.reducer;
export const {userSignUp, userLogin, setMessages} = userSlice.actions;




