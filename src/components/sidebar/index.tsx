import Image from 'next/image';

import title from '../../../public/Title.svg'

import { RiDashboardFill } from 'react-icons/ri'
import { BsBoxSeam } from 'react-icons/bs'
import { BsBoxArrowLeft } from 'react-icons/bs'

import styles from './styles.module.scss'
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className={styles.aside}>
      <div>
        <div className={styles.title}>
          <Image src={title} alt="Logo Zephyrus" />
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <a className={styles.item} href="dashboard">
                <RiDashboardFill className={styles.icon} />
                <div className={styles.titleMenu}>Dashboard</div>
              </a>
            </li>
            <li>
              <a className={styles.item} href="deliveries">
                <BsBoxSeam className={styles.icon} />
                <div className={styles.titleMenu}>Entregas</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer}>
        <Link href="/">
          <a className={styles.footerItem}>
            <BsBoxArrowLeft className={styles.icon} />
            <div className={styles.titleMenu}>Log Out</div>
          </a>
        </Link>
      </div>
    </aside>
  );
}