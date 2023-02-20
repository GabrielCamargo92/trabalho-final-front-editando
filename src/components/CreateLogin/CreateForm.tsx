import { Button, Grid, TextField, Typography } from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser, selectUsersById, User } from "../../store/modules/UserSlice";
import { setMessage } from "../../store/modules/MessageSlice";
import Message from "../Message";

const CreateForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userExist = useAppSelector((state: any) => selectUsersById(state, username));

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  const handleRegister = () => {
    if (!username || !password || !password2) {
      dispatch(
        setMessage({
          msg: "Preencha todos os campos",
          type: "warning",
        })
      );
      return;
    }
    if (username.length < 3) {
      dispatch(
        setMessage({
          msg: "O campo de username precisa de no minimo 3 caracteres",
          type: "warning",
        })
      );
      return;
    }
    if (password.length < 4) {
      dispatch(
        setMessage({
          msg: "O campo de password precisa de no minimo 4 caracteres",
          type: "warning",
        })
      );
      return;
    }
    if (password !== password2) {
      dispatch(
        setMessage({
          msg: "As senhas não conferem",
          type: "error",
        })
      );
      return;
    }
    if (userExist) {
      dispatch(
        setMessage({
          msg: "Username já existe",
          type: "warning",
        })
      );
      return;
    }
    const newUser: User = {
      username,
      password,
      logged: false,
    };
    dispatch(addUser(newUser));
    handleClear();
    dispatch(
      setMessage({
        msg: "Usuário criado com Sucesso",
        type: "success",
      })
    );
    navigate("/");
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", padding: "0 20px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Message />
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <ManageAccountsOutlinedIcon fontSize="large" />
            <Typography variant="h4">Cadastrar Usuário</Typography>
          </Grid>
          <Grid item xs={12} alignItems="center"></Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={(ev: { target: { value: React.SetStateAction<string> } }) =>
                setUsername(ev.target.value)
              }
              label="Username"
              value={username || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={(ev: { target: { value: React.SetStateAction<string> } }) =>
                setPassword(ev.target.value)
              }
              label="Senha"
              value={password || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={(ev: { target: { value: React.SetStateAction<string> } }) =>
                setPassword2(ev.target.value)
              }
              label="Repita a Senha"
              value={password2 || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center" item>
            <Grid>
              <Grid item xs={12}>
                <Button onClick={() => handleRegister()} variant="contained">
                  Criar Conta
                </Button>
                <Grid item xs={12} sx={{ padding: "5px" }}>
                  <Button onClick={handleBack} variant="outlined">
                    Voltar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { CreateForm };
