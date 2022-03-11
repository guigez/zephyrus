import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect } from 'react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';
import { useDeliveriesAvailable } from '../services/hooks/useDeliveriesAvailable';

import styles from '../styles/deliveries.module.scss'

const Deliveries: NextPage = () => {
    const { data, isLoading } = useDeliveriesAvailable();
    const { user } = useContext(GoogleAuthContext);

  return (
    <>
      <Head>
        <title>Zephyrus | Deliveries</title>
      </Head>

      <Header name={user.name || 'UNDEFINED'} avatar={user.avatar || 'UNDEFINED'}/>
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
                <tbody>
<<<<<<< HEAD
                  {isLoading ? (
                    <h1>Loading ...</h1>
                  ) : data.map(delivery => {
                    return(
                      <tr>
                        <td>{delivery.order.product_name}</td>
                        <td>{delivery.origin}</td>
                        <td>{delivery.destiny}</td>
                      </tr>
                    )
                  })}
=======
                  <tr>
                    <td><a href="/delivery">Pudim</a></td>
                    <td>casa origem legal lorem</td>
                    <td>casa destino muito legal</td>
                  </tr>
>>>>>>> cc934f0fa53b3b7d1a3ee81564fb3c27cb5854a6
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deliveries
