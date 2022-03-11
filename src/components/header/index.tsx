import { useContext } from 'react';
import { GoogleAuthContext } from '../../contexts/GoogleAuthContext';
import styles from './styles.module.scss'

type Profile = {
  name: string,
  avatar: string
}

export function Header({name, avatar}: Profile) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>{name}</div>
        <div className={styles.photoUser}> <img src={avatar} className={styles.photoUser} /> </div>
      </div>
    </header>
  );
}
