import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// interface LoginType {
//   username: string;
//   password: string;
//   logged: boolean;
//   notes?: string[];
// }

// const initialState: LoginType = {
//   username: "",
//   password: "",
//   logged: false,
//   notes: [],
// };

export interface UserLogin {
  username: string;
  password: string;
  logged: boolean;
}

const userAdapter = createEntityAdapter<UserLogin>({
  selectId: (item) => item.username,
});

const loginSlice = createSlice({
  name: "login",
  initialState: userAdapter.getInitialState({}),
  reducers: {
    addUser: userAdapter.addOne,
    updateUser: userAdapter.updateOne,
    removeUser: userAdapter.removeOne,
  },
});

export const { addUser, updateUser, removeUser } = loginSlice.actions;
export default loginSlice.reducer;
