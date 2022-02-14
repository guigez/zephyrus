import Image from 'next/image';

import deliveriesIcon from '../../../public/deliveries.svg';
import logoutIcon from '../../../public/logout.svg'
import dashboardIcon from '../../../public/Dashboard.svg'
import title from '../../../public/Title.svg'

import styles from './styles.module.scss'

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
              <a className={styles.item} href="">
                <Image className={styles.icon} src={dashboardIcon} alt="Icone dashboard" />
                <div className={styles.titleMenu}>Dashboard</div>
              </a>
            </li>
            <li>
              <a className={styles.item} href="">
                <Image className={styles.icon} src={deliveriesIcon} alt="Icone entregas" />
                <div className={styles.titleMenu}>Entregas</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer}>
        <a className={styles.footerItem} href="">
          <Image className={styles.icon} src={logoutIcon} alt="Icone logout" />
          <div className={styles.titleMenu}>Log Out</div>
        </a>
      </div>
    </aside>

  );
}