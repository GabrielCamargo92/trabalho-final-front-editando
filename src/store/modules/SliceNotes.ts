import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiGetNotes } from "../../api";
import CopyNoteType from "../../types/CopyNoteTypes";
// import { apiGetNotes } from "../../api";
import NoteType from "../../types/NoteType";

const adapter = createEntityAdapter<NoteType>({
  selectId: (item) => item.id,
});

export const { selectAll: selectNotes, selectById: selectNoteById } = adapter.getSelectors(
  (state: RootState) => state.notes
);

export const getNotes = createAsyncThunk("getNotes", async (idUser: any) => {
  try {
    const { data } = await apiGetNotes("/userNotes", idUser);
    if (data.ok === true) {
      return data.data;
    }
  } catch (data: any) {
    return data.message;
  }
});

const SliceNotes = createSlice({
  name: "notes",
  initialState: adapter.getInitialState({ status: "" }),
  reducers: {
    setAll: adapter.setAll,
    addNote: adapter.addOne,
    addMany: adapter.addMany,
    updateNote: adapter.updateOne,
    deleteNote: adapter.removeOne,
    deleteNotes: adapter.removeAll,
  },
  extraReducers(builder) {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    });
  },
});

export const { addNote, addMany, deleteNote, updateNote, setAll } = SliceNotes.actions;
export default SliceNotes.reducer;
