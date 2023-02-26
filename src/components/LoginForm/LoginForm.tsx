import { Button, Grid, TextField, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import Message from "../Message";
import { setMessage } from "../../store/modules/MessageSlice";
import { loginUser } from "../../store/modules/LoginSlice";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!username) {
      dispatch(
        setMessage({
          msg: "Usuário não cadastrado ou Senha incorreta",
          type: "error",
        })
      );
      if (!password) {
        dispatch(
          setMessage({
            msg: "Preencha o campo para password",
            type: "error",
          })
        );
      }
      return;
    }
    const userLogin = {
      username,
      password,
      logged: false,
    };
    const result = await dispatch(loginUser(userLogin)).unwrap();
    if (result.ok) {
      dispatch(
        loginUser({
          username,
          password,
          logged: true,
        })
      );
      dispatch(
        setMessage({
          msg: "Login Realizado com Sucesso",
          type: "success",
        })
      );
      navigate("/");
    }
  };

  const handleCreateLogin = () => {
    navigate("/createLogin");
  };

  // const handleLogin = () => {
  //   if (!username) {
  //     dispatch(
  //       setMessage({
  //         msg: "Usuário não cadastrado ou Senha incorreta",
  //         type: "error",
  //       })
  //     );
  //     if (!password) {
  //       dispatch(
  //         setMessage({
  //           msg: "Preencha o campo para password",
  //           type: "error",
  //         })
  //       );
  //     }
  //     return;
  //   }
  //   dispatch(
  //     loginUser({
  //       username,
  //       password,
  //       logged: true,
  //     })
  //   );
  //   dispatch(
  //     setMessage({
  //       msg: "Login Realizado com Sucesso",
  //       type: "success",
  //     })
  //   );
  //   navigate("/");
  // };

  // const handleCreateLogin = () => {
  //   navigate("/createLogin");
  // };

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
            <DescriptionOutlinedIcon fontSize="large" />
            <Typography variant="h4">Página de Recados</Typography>
          </Grid>
          <Grid item xs={12} alignItems="center"></Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              onChange={(ev: { target: { value: any } }) => setUsername(ev.target.value)}
              label="Username"
              value={username || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              type="password"
              onChange={(ev: { target: { value: any } }) => setPassword(ev.target.value)}
              label="Senha"
              value={password || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center" item>
            <Grid>
              <Grid item xs={12}>
                <Button onClick={() => handleLogin()} variant="contained">
                  Logar
                </Button>
                <Grid item xs={12} sx={{ padding: "5px" }}>
                  <Button onClick={handleCreateLogin} variant="outlined">
                    Cadastrar Usuário
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

export { LoginForm };
