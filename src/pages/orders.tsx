import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/orders.module.scss'

import { InfoOrders } from '../components/infoOrders'
import { Header } from '../components/header'
import { Sidebar } from '../components/sidebar'
import { useContext } from 'react'
import { GoogleAuthContext } from '../contexts/GoogleAuthContext'


const Orders: NextPage = () => {
  const { user } = useContext(GoogleAuthContext);

  return (
    <>
      <Head>
        <title>Zephyrus | Orders</title>
      </Head>

      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <main>
            <InfoOrders />
          </main>
        </div>
      </div>
    </>
  )
}

export default Orders
