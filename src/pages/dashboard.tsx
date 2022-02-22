import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';

import styles from '../styles/dashboard.module.scss'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zephyrus | Dashboard</title>
      </Head>


      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Dashboard
