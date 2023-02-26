import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface User {
  username: string;
  password: string;
  logged: boolean;
  // notes: [];
}

const UserAdapter = createEntityAdapter<User>({
  selectId: (item) => item.username,
});

export const { selectAll: selectUsers, selectById: selectUsersById } = UserAdapter.getSelectors(
  (state: RootState) => state.users
);

const UserSlice = createSlice({
  name: "user",
  initialState: UserAdapter.getInitialState(),
  reducers: {
    addUser: UserAdapter.addOne,
    login(state, { payload: { username } }: PayloadAction<{ username: string }>) {
      UserAdapter.updateOne(state, { id: username, changes: { logged: true } });
    },
    logoff(state, action: PayloadAction<{ username: any }>) {
      UserAdapter.updateOne(state, { id: action.payload.username, changes: { logged: false } });
    },
  },
});

export const { addUser, login, logoff } = UserSlice.actions;
export default UserSlice.reducer;
