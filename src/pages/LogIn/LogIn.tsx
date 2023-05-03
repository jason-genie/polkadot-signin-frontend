import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsForm } from "../../components";
import { ICredentials, IUser } from "../../interfaces";
import { logIn } from "../../requests";

import styles from './LogIn.module.css';

interface LogInProps {
  onLogIn: (user: IUser) => void;
}

export function LogIn(props: LogInProps) {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function logInAndRedirect(credentials: ICredentials) {
    setError(false);
    try {
      const user = await logIn(credentials);
      props.onLogIn(user);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  return (
    <div className={`${styles.container} box`}>
      <CredentialsForm error={error} type="login" onSubmit={logInAndRedirect} />
    </div>
  );
}