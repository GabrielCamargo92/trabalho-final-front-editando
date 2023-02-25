import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCreate } from "../../api";

export interface UserLogin {
  username: string;
  password: string;
  logged: boolean;
}

export const createUser = createAsyncThunk("createUser", async (newUser: UserLogin) => {
  try {
    const { data } = await apiCreate("/user/createLogin", newUser);
    return data;
  } catch (data: any) {
    return data;
  }
});

export const loginUser = createAsyncThunk("loginUser", async (newUser: UserLogin) => {
  try {
    const { data } = await apiCreate("/user/login", newUser);
    if (data.ok === true) {
      return data.data;
    }
  } catch (data: any) {
    return data.message;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    id: undefined,
    username: undefined,
    logged: false,
  },
  reducers: {
    logOff(state, action: PayloadAction<{ username: any }>) {
      return { id: undefined, username: undefined, logged: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default loginSlice.reducer;
export const { logOff } = loginSlice.actions;
