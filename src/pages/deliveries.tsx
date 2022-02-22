import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';

import styles from '../styles/dashboard.module.scss'

const Deliveries: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zephyrus | Deliveries</title>
      </Head>

      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Deliveries
