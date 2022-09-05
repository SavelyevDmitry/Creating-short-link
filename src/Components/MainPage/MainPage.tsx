import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import { getIsAuth } from "../../redux/selectors/auth-selector";
import { getAuthToken } from './../../redux/selectors/auth-selector';
import { useAppDispatch } from "../../redux/store";

import InputLink from "./InputLink/InputLink";
import LinksTable from "./LinksTable/LinksTable";

import styles from './MainPage.module.css'
import { initialGetStatistics } from './../../redux/reducers/links-reducer';
import Pagination from "./Pagination/Pagination";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const token = useSelector( getAuthToken );

  useEffect(() => {
    dispatch ( initialGetStatistics(token) as any );
  }, [])

  const isAuth = useSelector( getIsAuth );

  return (
    !isAuth ? <Navigate replace to="/login" />
    :<div className = { styles.wrapper }>
      <h2 className = { styles.title } >Create short link</h2>
      <InputLink token ={token}/>
      <h2 className = { styles.title } >Statistics</h2>
      <Pagination />
      <LinksTable />
    </div>
  )
}

export default MainPage;