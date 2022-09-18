import React, { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../../redux/reducers/auth-reducer";
import { useAppDispatch } from "../../redux/store";

import styles from './Login.module.css'
import { useSelector } from 'react-redux';
import { getIsAuth, getIsAuthInProgress, getLoginError, getUserName } from './../../redux/selectors/auth-selector';
import Spinner from "../common/Spinner/Spinner";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginError = useSelector( getLoginError );
  const isAuth = useSelector( getIsAuth );
  const isAuthInProgress = useSelector( getIsAuthInProgress );
  const user = useSelector( getUserName );

  const dispatch = useAppDispatch();

  const usernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  }

  const loginClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch( login(username, password) as any );
  }

  return (
    isAuthInProgress 
      ? <Spinner />
      : isAuth 
        ? <p className={styles.info}> You are logged in as <span className={styles.username}>{user}</span> </p>
        :<form className = { styles.form } onSubmit = { loginClick }>
          <div className = { styles.inputWrap }>
            <label htmlFor="login__username" className = { styles.label }>Username:</label>
            <input required = { true } type="text" name="username" id="login__username" className = { styles.input }
              placeholder = { 'Username' } value = {username} onChange = { usernameChange }/>
          </div>
          <div className = { styles.inputWrap }>
            <label htmlFor="login__password" className = { styles.label }>Password:</label>
            <input required = { true } type="password" name="password" id="login__password" className = { styles.input }
              placeholder = { 'Password' }  value = {password} onChange = { passwordChange }/>
          </div>
          { loginError && <p>{loginError}</p> }
          <div className = { styles.buttonWrap }>
            <button className = 'btn btn--login' >Log In</button>
          </div>
        </form>
  )
}

export default Login;
