import axios from 'axios';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';
import { useDeliveriesAvailable } from '../services/hooks/useDeliveriesAvailable';

import styles from '../styles/deliveries.module.scss'

const Deliveries: NextPage = () => {
  const { data } = useSession();
  const { token } = data;
  const { data: deliveries, isLoading, isFetching } = useDeliveriesAvailable(token as string);

  async function handleDelivery(id: string) {

  }

  return (
    <>
      <Head>
        <title>Zephyrus | Deliveries</title>
      </Head>

      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.main}>
            <h1> Produtos a serem entregues  </h1>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Origem</th>
                    <th>Destino</th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div className={styles.table}>
                    <h1>Loading ...</h1>
                  </div>
                ) : deliveries.map(delivery => {
                  return (
                    <>
                      <tbody>
                        <tr key={delivery.id}>
                          <td style={{ color: '#2381FD', fontWeight: '500' }}>
                            <Link href={`/delivery/${token}/${delivery.id}`}>{delivery.order.product_name}</Link></td>
                          <td>{delivery.origin}</td>
                          <td>{delivery.destiny}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deliveries
