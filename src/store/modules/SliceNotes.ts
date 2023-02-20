import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import NoteType from "../../types/NoteType";

const adapter = createEntityAdapter<NoteType>({
  selectId: (item) => item.id,
});

export const { selectAll: selectNotes, selectById: selectNoteById } = adapter.getSelectors(
  (state: RootState) => state.notes
);

const SliceNotes = createSlice({
  name: "notes",
  initialState: adapter.getInitialState({ status: "" }),
  reducers: {
    addNote: adapter.addOne,
    addMany: adapter.addMany,
    updateNote: adapter.updateOne,
    deleteNote: adapter.removeOne,
    deleteNotes: adapter.removeAll,
  },
});

export const { addNote, addMany, deleteNote, updateNote } = SliceNotes.actions;
export default SliceNotes.reducer;
