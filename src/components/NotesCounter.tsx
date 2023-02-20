import React from "react";
import Badge from "@mui/material/Badge";
import { useAppSelector } from "../store/hooks";
import { selectNotes } from "../store/modules/SliceNotes";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const NotesCounter: React.FC = () => {
  const notesRedux = useAppSelector(selectNotes);

  return (
    <Badge badgeContent={notesRedux.length} color="secondary">
      <DescriptionOutlinedIcon />
    </Badge>
  );
};

export default NotesCounter;
