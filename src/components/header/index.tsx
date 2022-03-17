import { useContext } from 'react';
import { GoogleAuthContext } from '../../contexts/GoogleAuthContext';
import { useGoogleAuth } from '../../services/hooks/useGoogleAuth';
import styles from './styles.module.scss'

export function Header() {
  const { user } = useGoogleAuth()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>{user.name}</div>
        <div className={styles.photoUser}> <img src={user.avatar} className={styles.photoUser} /> </div>
      </div>
    </header>
  );
}
