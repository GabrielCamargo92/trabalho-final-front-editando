import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateForm } from "../components/CreateLogin/CreateForm";
import { useAppSelector } from "../store/hooks";
import { selectUsers } from "../store/modules/UserSlice";

const CreateLogin: React.FC = () => {
  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find((user) => user.logged);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) {
      navigate("/");
    }
  }, [navigate, userLogged, usersRedux]);

  return (
    <div>
      <CreateForm />
    </div>
  );
};

export default CreateLogin;
