import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAppSelector } from "../store/hooks";
import { selectUsers } from "../store/modules/UserSlice";

const Login: React.FC = () => {
  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find((user: { logged: any }) => user.logged);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) {
      navigate("/home");
    }
  }, [navigate, userLogged, usersRedux]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export { Login };
