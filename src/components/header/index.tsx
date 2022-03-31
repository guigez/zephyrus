
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import styles from './styles.module.scss'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>{session.user.name}</div>
        <div className={styles.photoUser}> <img src={session.user.image} className={styles.photoUser} /> </div>
      </div>
    </header>
  );
}
