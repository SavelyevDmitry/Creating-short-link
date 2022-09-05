import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import authReducer from './reducers/auth-reducer';
import linksReducer from './reducers/links-reducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer
  },
  middleware: [ thunkMiddleware ]
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export type TAppState = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store;

export default store;