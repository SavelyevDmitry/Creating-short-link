import React, { useEffect } from "react";

import {HandySvg} from 'handy-svg';

import styles from './LinksTable.module.css';
import LinksTableRow from "./LinksTableRow/LinksTableRow";
import { useSelector } from 'react-redux';
import { getLinksData, getSortType } from "../../../redux/selectors/links-selector";

import arrowDown from '../../../assets/img/arrow-down.svg'
import { ESortTypes, getStatistics, SetSortType } from "../../../redux/reducers/links-reducer";
import { useAppDispatch } from "../../../redux/store";
import { getAuthToken } from "../../../redux/selectors/auth-selector";
import { getPageSize } from './../../../redux/selectors/links-selector';

const LinksTable = () => {
  const links = useSelector( getLinksData );

  const token = useSelector( getAuthToken );
  const sortType = useSelector( getSortType );
  const pageSize = useSelector( getPageSize );

  const dispatch = useAppDispatch();

  const isSortASC = sortType === ESortTypes.counterASC || sortType === ESortTypes.shortASC || sortType === ESortTypes.targetLinkASC;
  const isSortTargetLink = sortType === ESortTypes.targetLinkASC || sortType === ESortTypes.targetLinkDESC;
  const isSortShort = sortType === ESortTypes.shortASC || sortType === ESortTypes.shortDESC;
  const isSortCounter = sortType === ESortTypes.counterASC || sortType === ESortTypes.counterDESC;

  useEffect(() => {
    dispatch( getStatistics(token, sortType, pageSize) as any );
  }, [token, sortType, dispatch])

  const onClickTargetLinks = () => {
    sortType === ESortTypes.targetLinkASC 
      ? dispatch( SetSortType(ESortTypes.targetLinkDESC) )
      : dispatch( SetSortType(ESortTypes.targetLinkASC) )
  }

  const onClickShortLinks = () => {
    sortType === ESortTypes.shortASC 
      ? dispatch( SetSortType(ESortTypes.shortDESC) )
      : dispatch( SetSortType(ESortTypes.shortASC) )
  }

  const onClickCounter = () => {
    sortType === ESortTypes.counterASC 
      ? dispatch( SetSortType(ESortTypes.counterDESC) )
      : dispatch( SetSortType(ESortTypes.counterASC) )
  }

  const LinksTableRows = links.map(link => <LinksTableRow key={link.id} id={link.id} link={link.target} shortLink={link.short} counter={link.counter} />)

  return (
    <table className = {styles.table} >
      <thead>
        <tr className = {styles.headerRow} >

          <th className = {styles.headerCell}  onClick = { onClickTargetLinks }>
            Link {isSortTargetLink && <HandySvg src={arrowDown} className = {isSortASC ? styles.arrow : `${styles.arrow} ${styles.arrowReverse}`} />} 
          </th>

          <th className = {styles.headerCell} onClick = { onClickShortLinks }>
            Short link {isSortShort && <HandySvg src={arrowDown} className = {isSortASC ? styles.arrow : `${styles.arrow} ${styles.arrowReverse}`} />} 
          </th>

          <th className = {styles.headerCell} onClick = { onClickCounter }>
            Counter {isSortCounter && <HandySvg src={arrowDown} className = {isSortASC ? styles.arrow : `${styles.arrow} ${styles.arrowReverse}`} />} 
          </th> 

        </tr>
      </thead>
      <tbody>
        { LinksTableRows }
      </tbody>
    </table>
  )
}

export default LinksTable;