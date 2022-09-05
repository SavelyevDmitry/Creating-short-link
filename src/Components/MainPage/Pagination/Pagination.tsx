import React from "react";
import { useSelector } from 'react-redux';
import { getTotalCountLinks } from "../../../redux/selectors/links-selector";
import { useAppDispatch } from "../../../redux/store";
import { getPageSize, getCurrentPageNumber } from './../../../redux/selectors/links-selector';

import styles from './Pagination.module.css';
import { changePage } from './../../../redux/reducers/links-reducer';

const Pagination = () => {
  const dispatch = useAppDispatch();

  const totalCountLinks = useSelector( getTotalCountLinks );
  const pageSize = useSelector( getPageSize );
  const currentPageNumber = useSelector( getCurrentPageNumber );

  const pagesCount = Math.ceil( totalCountLinks / pageSize );

  if(pagesCount <= 1) return <></>

  let paginationButtons = []

  for (let i = 1; i <= pagesCount; i++) {
    paginationButtons.push(i);
  }

  const onChangePage = (pageNumber: number) => {
    dispatch( changePage(pageNumber) as any );
  }

  paginationButtons = paginationButtons.map(number => 
    <button key={number} disabled = {number === currentPageNumber} onClick={() => {onChangePage(number)}}
      className = {number === currentPageNumber ? `${styles.button} ${styles.activeButton}` : styles.button}> 
      {number} 
    </button>)

  return (
    <div className={styles.pagination}>
      {paginationButtons}
    </div>
  )
}

export default Pagination;