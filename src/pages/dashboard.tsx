import type { NextPage } from 'next'
import Head from 'next/head'
import { Sidebar } from '../components/sidebar';

import styles from '../styles/dashboard.module.scss'

const Dashboard: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zephyrus | Dashboard</title>
      </Head>

      <div className={styles.content}>
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard
