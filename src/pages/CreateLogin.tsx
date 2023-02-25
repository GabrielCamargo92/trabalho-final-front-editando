import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateForm } from "../components/CreateLogin/CreateForm";
import { useAppSelector } from "../store/hooks";

const CreateLogin: React.FC = () => {
  const usersRedux = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (usersRedux.logged) {
      navigate("/");
    }
  }, [navigate, usersRedux]);

  return (
    <div>
      <CreateForm />
    </div>
  );
};

export default CreateLogin;
