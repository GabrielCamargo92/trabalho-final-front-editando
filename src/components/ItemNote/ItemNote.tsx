import { Divider, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { NoteType } from "../../types";
import StarIcon from "@mui/icons-material/Star";

interface ItemNoteProps {
  note: NoteType;
  actionDelete: (note: NoteType) => void;
  actionEdit: (note: NoteType) => void;
}

const ItemNote: React.FC<ItemNoteProps> = ({ note, actionDelete, actionEdit }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton
              onClick={() => actionEdit(note)}
              edge="end"
              aria-label="edit"
              sx={{ paddingRight: "20px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => actionDelete(note)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary={note.description} secondary={note.detail} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ItemNote;
