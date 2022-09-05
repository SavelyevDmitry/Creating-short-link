import React, { FC, MouseEvent } from "react";

import styles from './LinksTableRow.module.css';

type TProps = {
  id: number
  link: string
  shortLink: string
  counter: number
}

const LinksTableRow: FC<TProps> = ({id, link, shortLink, counter}) => {
  const onClickCell = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
  }
  return (
    <tr key = { id } className = {styles.tableRow} >
      <td className = {styles.tableCell} onClick = {onClickCell}>{ link }</td>
      <td className = {styles.tableCell} onClick = {onClickCell}>{ `http://79.143.31.216/s/${shortLink}` }</td>
      <td className = {styles.tableCell} >{ counter }</td>
    </tr>
  )
}

export default LinksTableRow;