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
                    <th>Name</th>
                    <th>Origin</th>
                    <th>destiny</th>
                  </tr>
                </thead>
                <tbody>
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
