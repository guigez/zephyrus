import { RiDashboardFill } from 'react-icons/ri'
import { BsBoxSeam } from 'react-icons/bs'
import { BsBoxArrowLeft } from 'react-icons/bs'

import styles from './styles.module.scss'
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useGoogleAuth } from '../../services/hooks/useGoogleAuth';


export function Sidebar() {
  const { asPath } = useRouter()
  const { googleSignOut, googleBeSignIn } = useGoogleAuth();
  const router = useRouter();

  async function logOut() {
    if (!googleBeSignIn) {
      await googleSignOut();
    }
    router.push('/');
  }

  return (
    <aside className={styles.asideContainer}>
      <div className={styles.asideContent}>
        <img className={styles.title} src="/Title.svg" alt="Title of Application" />
        <nav className={styles.nav}>
          <Link href="/dashboard">
            <a className={asPath === '/dashboard' ? styles.active + ' ' + styles.item : styles.item}>
              <RiDashboardFill className={styles.icon} />
              Dashboard
            </a>
          </Link>
          <Link href="/deliveries">
            <a className={asPath === '/deliveries' ? styles.active + ' ' + styles.item : styles.item}>
              <BsBoxSeam className={styles.icon} />
              Entregas
            </a>
          </Link>
        </nav>
        <div className={styles.footer}>

          <a className={styles.footerItem} onClick={logOut}>
            <BsBoxArrowLeft className={styles.icon} />
            Log Out
          </a>

        </div>
      </div>
    </aside>
  );
}