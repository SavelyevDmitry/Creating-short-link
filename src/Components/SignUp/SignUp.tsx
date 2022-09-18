import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from './SignUp.module.css'
import { signUp } from './../../redux/reducers/auth-reducer';
import { useAppDispatch } from "../../redux/store";
import { useSelector } from 'react-redux';
import { getIsAuth, getSignupMessage } from "../../redux/selectors/auth-selector";
import { getUserName, getIsSignupInProgress } from './../../redux/selectors/auth-selector';
import Spinner from './../common/Spinner/Spinner';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signupMessage = useSelector(getSignupMessage);
  const isAuth = useSelector( getIsAuth );
  const isSignupInProgress = useSelector( getIsSignupInProgress )
  const user = useSelector( getUserName );

  const dispatch = useAppDispatch();

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const loginClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch( signUp(username, password) as any );
  }

  return (
    isSignupInProgress 
      ? <Spinner />
      : isAuth 
        ? <p className={styles.info}> You are logged in as <span className={styles.username}>{user}</span> </p>
        :<form className = { styles.form } onSubmit={loginClick}>
          <div className = { styles.inputWrap }>
            <label htmlFor="login__username" className = { styles.label } >Username:</label>
            <input type="text" name="username" id="login__username" className = { styles.input } 
              placeholder = { 'Username' } value = {username} onChange = { usernameChange }/>
          </div>
          <div className = { styles.inputWrap }>
            <label htmlFor="login__password" className = { styles.label } >Password:</label>
            <input type="password" name="password" id="login__password" className = { styles.input }
              placeholder = { 'Password' }  value = {password} onChange = { passwordChange }/>
          </div>
          {signupMessage && <p>{signupMessage}</p>}
          <div className = { styles.buttonWrap }>
            <button className = 'btn btn--login' >Sign Up</button>
          </div>
        </form>
  )
}

export default SignUp;