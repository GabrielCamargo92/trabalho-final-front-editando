import { combineReducers } from "@reduxjs/toolkit";

import counter from "./CounterSlice";
import notes from "./SliceNotes";
import login from "./LoginSlice";
import message from "./MessageSlice";
import users from "./UserSlice";

export default combineReducers({
  counter,
  notes,
  login,
  message,
  users,
});
