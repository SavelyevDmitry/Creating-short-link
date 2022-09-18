import { ThunkAction } from 'redux-thunk';

import { API } from './../../api/api';

import { TAppState } from '../store';

const SET_USERNAME = '/auth/SET-USERNAME';
const SET_AUTH_TOKEN = '/auth/SET-AUTH-TOKEN';
const SET_AUTH_ERROR = '/auth/SET-AUTH-ERROR';
const SET_SIGNUP_MESSAGE = '/auth/SET_SIGNUP_MESSAGE';
const SET_IS_AUTH = '/auth/SET-IS-AUTH';
const SET_IS_AUTH_IN_PROGRESS = '/auth/SET-IS-AUTH-IN-PROGRESS'
const SET_IS_SIGNUP_IN_PROGRESS = '/auth/SET-IS-SIGNUP-IN-PROGRESS'
const SET_TEST = '/auth/SET-TEST';

type TSetUsername = { type: typeof SET_USERNAME, username: string }
type TSetAuthToken = { type: typeof SET_AUTH_TOKEN, token: string }
type TSetAuthError = { type: typeof SET_AUTH_ERROR, error: string }
type TSetSignupMessage = { type: typeof SET_SIGNUP_MESSAGE, message: string }
type TSetIsAuth = { type: typeof SET_IS_AUTH, isAuth: boolean}
type TSetIsAuthInProgress = { type: typeof SET_IS_AUTH_IN_PROGRESS, isAuthInProgress: boolean}
type TSetIsSignupInProgress = { type: typeof SET_IS_SIGNUP_IN_PROGRESS, isSignupInProgress: boolean}
type TSetTest = {type: typeof SET_TEST }

export type TActions = TSetIsSignupInProgress | TSetIsAuthInProgress | TSetUsername 
  | TSetAuthToken | TSetAuthError | TSetSignupMessage 
  | TSetIsAuth | TSetTest;

const initialState = {
  username: null as string | null,
  authToken: '',
  loginError: '',
  signupMessage: '',
  isAuth: false,
  isAuthInProgress: false,
  isSignupInProgress: false
} 

export type TAuthReducerState = typeof initialState;

const authReducer = (state = initialState, action: TActions): TAuthReducerState => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      }
    
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.token
      }

    case SET_AUTH_ERROR: 
      return {
        ...state,
        loginError: action.error
      }

    case SET_SIGNUP_MESSAGE:
      return {
        ...state,
        signupMessage: action.message
      }

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      }
    
    case SET_IS_AUTH_IN_PROGRESS:
      return {
        ...state,
        isAuthInProgress: action.isAuthInProgress
      }

    case SET_IS_SIGNUP_IN_PROGRESS:
      return {
        ...state,
        isSignupInProgress: action.isSignupInProgress
      }
    
    default:
      return state
  }
}

export const setSignupMessage = (message: string): TSetSignupMessage => ({ type: SET_SIGNUP_MESSAGE, message })
export const setAuthError = (error: string): TSetAuthError => ({ type: SET_AUTH_ERROR, error })
export const setAuthToken = (token: string): TSetAuthToken => ({ type: SET_AUTH_TOKEN, token});
export const setUsername = (username: string): TSetUsername => ({ type: SET_USERNAME, username });
export const setIsAuth = (isAuth: boolean): TSetIsAuth => ({ type: SET_IS_AUTH, isAuth });
export const setIsAuthInProgress = (isAuthInProgress: boolean): TSetIsAuthInProgress => ({ type: SET_IS_AUTH_IN_PROGRESS, isAuthInProgress });
export const setIsSignupInProgress = (isSignupInProgress: boolean): TSetIsSignupInProgress => ({ type: SET_IS_SIGNUP_IN_PROGRESS, isSignupInProgress });

export  const login = (username: string, password: string): ThunkAction<void, TAppState, unknown, TActions> => (dispatch) => {
  dispatch( setIsAuthInProgress(true) );

  API.login(username, password)
    .then(res => {
      switch (res.status) {
        case 200:
          dispatch( setAuthToken(res.data.access_token) );
          dispatch( setAuthError('') );
          dispatch( setUsername(username) );
          dispatch( setIsAuth(true) );
          break;
        case 422:
          dispatch( setAuthError('Fields are required') );
          break;
        case 400:
          dispatch( setAuthError(res.data.detail) );
          break;
      }
    
      dispatch( setIsAuthInProgress(false) );
    }
  );
  
  
}

export const signUp = (username: string, password: string): ThunkAction<void, TAppState, unknown, TActions> => async (dispatch) => {
  dispatch( setIsSignupInProgress(true) );
  
  API.signup(username, password)
    .then(res => {
      switch (res.status) {
        case 200:
          dispatch( setSignupMessage('registration was successful') )
          break;
        case 422:
          dispatch( setSignupMessage('Fields are required') );
          break;
        case 400:
          dispatch( setSignupMessage(res.data.detail) );
          break;
      }

      dispatch( setIsSignupInProgress(false) );
    })

  

  
}

export default authReducer;