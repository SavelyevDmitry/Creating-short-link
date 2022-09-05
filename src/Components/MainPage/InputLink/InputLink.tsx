import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import { useAppDispatch } from "../../../redux/store";
import { createShortLink, initialGetStatistics } from './../../../redux/reducers/links-reducer';

import styles from './InputLink.module.css';

type TProps = {
  token: string
}

const InputLink: FC<TProps> = ({ token }) => {
  const [linkInputText, setLinkInputText] = useState('');

  const dispatch = useAppDispatch();

  const linkTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLinkInputText(e.target.value);
  }

  const createLinkSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const encoded = encodeURIComponent(linkInputText);
    dispatch( createShortLink(encoded) as any );
    dispatch( initialGetStatistics(token) as any );

    setLinkInputText('');
  }

  return (
    <form className = { styles.form } onSubmit = { createLinkSubmit }>
      <div className= { styles.inputWrap }>
        <label htmlFor="link" className = { styles.inputLabel }>Input your link:</label>
        <input type="text" name="link" id="link" className= { styles.input } 
          placeholder = 'Link' value = { linkInputText } onChange = { linkTextChange } />
      </div>
      <div>
        <button className = 'btn' >Create shot link</button>
      </div>
    </form>
  )
}

export default InputLink;