import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';
import { useDeliveriesAvailable } from '../services/hooks/useDeliveriesAvailable';

import styles from '../styles/deliveries.module.scss'

const Deliveries: NextPage = () => {
  const { data, isLoading, isFetching } = useDeliveriesAvailable();
  const { user } = useContext(GoogleAuthContext);

  async function handleDelivery(id: string) {

  }

  return (
    <>
      <Head>
        <title>Zephyrus | Deliveries</title>
      </Head>

      <Header name={user.name} avatar={user.avatar} />
      <div className={styles.container}>
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.main}>
            <h1> Produtos a serem entregues  </h1>
            {isLoading ? (
              <div className={styles.table}>
                <h1>Loading ...</h1>
              </div>
            ) : data.map(delivery => {
              return (
                <>
                  <div className={styles.table}>
                    <table>
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Origem</th>
                          <th>Destino</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={delivery.id}>
                          <td style={{ color: '#2381FD', fontWeight: '500' }}>
                            <Link href={`/delivery/${delivery.id}`}>{delivery.order.product_name}</Link></td>
                          <td>{delivery.origin}</td>
                          <td>{delivery.destiny}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Deliveries
