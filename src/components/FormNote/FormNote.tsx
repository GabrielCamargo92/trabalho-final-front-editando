import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/MessageSlice";
import { NoteType } from "../../types";
import Message from "../Message";

interface FormNoteProps {
  action: (note: NoteType) => void;
}

const FormNote: React.FC<FormNoteProps> = ({ action }) => {
  // const [id, setId] = useState<number>;
  const [description, setDescription] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const inputDescription = useRef<HTMLInputElement | undefined>();
  const inputDetail = useRef<HTMLInputElement | undefined>();

  const dispatch = useAppDispatch();

  const handleClear = () => {
    setDescription("");
    setDetail("");
  };

  const handleSubmit = () => {
    if (description.length < 3) {
      dispatch(
        setMessage({
          msg: "Preencha a descrição com no mín. 3 caracteres.",
          type: "warning",
        })
      );
      inputDescription.current?.focus();
      return;
    }

    if (detail.length < 3) {
      dispatch(
        setMessage({
          msg: "Preencha o detalhamento com no mín. 3 caracteres.",
          type: "warning",
        })
      );
      inputDetail.current?.focus();
      return;
    }

    action({
      description,
      detail,
      id: new Date().getTime() / 10000,
    });
    handleClear();
  };

  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Message />
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) => setDescription(ev.target.value)}
          label="Descrição"
          value={description || ""}
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          inputRef={inputDescription}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) => setDetail(ev.target.value)}
          label="Detalhamento"
          value={detail || ""}
          variant="outlined"
          inputProps={{ maxLength: 40 }}
          inputRef={inputDetail}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button onClick={handleClear} variant="outlined">
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} variant="contained">
              Anotar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormNote;
