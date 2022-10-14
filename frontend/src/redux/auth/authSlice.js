import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

console.log(user, "local storage get item authslice 45453453535435");

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    console.log(user, "auth slice user console rg 1");
    try {
      console.log(user, "auth slice user console rg try");
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.resposne.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  console.log(user, "auth slice user console lg 1");
  try {
    console.log(user, "auth slice user console lg try");
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.resposne.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//logout function
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUser:(state,action)=>{
       state.user=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // action here has data back .
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        //payload = user is returned on top as user ..
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //here action.payload set to message and passed on top in catch error using thunk function
        
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload,"authslicein payload.....101010101010110");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // .addCase(markSeenNotifications.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(markSeenNotifications.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
      // .addCase(markSeenNotifications.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.user = null;
      // })

      // .addCase(deleteAllNotifications.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteAllNotifications.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
      // .addCase(deleteAllNotifications.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.user = null;
      // });

     
  },
});

// export const { reset,setUser } = authSlice.actions;
export default authSlice.reducer;
