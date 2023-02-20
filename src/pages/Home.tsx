import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { addNote, deleteNote, selectNotes, updateNote } from "../store/modules/SliceNotes";
import Message from "../components/Message";
import ItemNote from "../components/ItemNote/ItemNote";
import FormNote from "../components/FormNote/FormNote";
import NoteType from "../types/NoteType";
import { logoff, selectUsers } from "../store/modules/UserSlice";

const Home: React.FC = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>("");
  const [det, setDet] = useState<string>("");
  const [getId, setGetId] = useState<number>(0);
  const notesRedux = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find((user: { logged: any }) => user.logged);

  useEffect(() => {
    if (!userLogged) {
      navigate("/login");
    }
  }, [userLogged, navigate]);

  const handleAddDescription = useCallback(
    (note: NoteType) => {
      dispatch(addNote(note));
    },
    [dispatch]
  );

  const handleDeleteNote = useCallback(
    (note: NoteType) => {
      dispatch(deleteNote(note.id));
    },
    [dispatch]
  );

  const openEditModal = useCallback((note: NoteType) => {
    setGetId(note.id);
    setOpenEdit(true);
  }, []);

  const handleEditNote = useCallback(
    (note: NoteType) => {
      dispatch(
        updateNote({
          id: note.id,
          changes: {
            description: note.description,
            detail: note.detail,
          },
        })
      );
      setOpenEdit(false);
    },
    [dispatch]
  );

  const handleClose = () => {
    setOpenEdit(false);
  };

  console.log(userLogged?.username);

  // const getSessionStorage = sessionStorage.getItem("current") || "";

  const logOff = () => {
    dispatch(
      logoff({
        username: userLogged?.username,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormNote action={handleAddDescription} />
        <Message />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "5px" }}>
          {notesRedux.map((item: NoteType) => {
            return (
              <ItemNote
                key={item.id}
                note={item}
                actionDelete={() => handleDeleteNote(item)}
                actionEdit={() => openEditModal(item)}
              />
            );
          })}
        </Paper>
      </Grid>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edite seu recado</DialogTitle>
        <DialogContent>
          <DialogContentText>Insira uma nova descrição e/ou detalhamento</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={setDesc}
            onChange={(ev) => setDesc(ev.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Detalhamento"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={setDet}
            onChange={(ev) => {
              setDet(ev.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={() => handleEditNote({ id: getId, description: desc, detail: det })}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Button sx={{ marginTop: "10px" }} variant="outlined" onClick={logOff}>
        {" "}
        Sair
      </Button>
    </Grid>
  );
};

export default Home;
