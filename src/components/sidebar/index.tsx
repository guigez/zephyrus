import { RiDashboardFill } from 'react-icons/ri'
import { BsBoxSeam } from 'react-icons/bs'
import { BsBoxArrowLeft } from 'react-icons/bs'

import styles from './styles.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';


export function Sidebar() {
  const { asPath } = useRouter()

  console.log(asPath)

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
          <Link href="/">
            <a className={styles.footerItem}>
              <BsBoxArrowLeft className={styles.icon} />
              Log Out
            </a>
          </Link>
        </div>
      </div>
    </aside>
  );
}