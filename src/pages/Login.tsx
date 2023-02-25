import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAppSelector } from "../store/hooks";

const Login: React.FC = () => {
  const usersRedux = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (usersRedux.logged) {
      navigate("/");
    }
  }, [navigate, usersRedux]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export { Login };
