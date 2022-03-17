import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

import { useDeliveriesClient } from '../services/hooks/useDeliveriesClient';
import { useDeliveriesDeliveryman } from '../services/hooks/useDelivieriesDeliveryma'

import styles from '../styles/dashboard.module.scss'

const Dashboard: NextPage = () => {
  const { user } = useContext(GoogleAuthContext);

  const { data: dataClient, isLoading: isLoadingClient } = useDeliveriesClient();
  const { data: dataDeliveryman, isLoading: isLoadingDeliveryman } = useDeliveriesDeliveryman();

  return (
    <>
      <Head>
        <title>Zephyrus | Dashboard</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.main}>
            <div className={styles.tables}>
              <table>
                <thead>
                  <tr>
                    <th>Produto Cadastrado</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {isLoadingClient ? (
                  <div className={styles.table}>
                    <h1>Loading ...</h1>
                  </div>
                ) : dataClient.map(deliveryClient => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{deliveryClient.order.product_name}</td>
                          {deliveryClient.status === 'available' ? (
                            <td style={{ backgroundColor: '#E73F5D', textAlign: 'center', fontWeight: '500' }}>Não Entregue</td>
                          ) : deliveryClient.status === 'delivered' ? (
                            <td style={{ backgroundColor: '#78E025', textAlign: 'center', fontWeight: '500' }}>Entregue</td>
                          ) :
                            <td style={{ backgroundColor: '#E9E125', textAlign: 'center', fontWeight: '500' }}>Aguardando Entrega</td>
                          }
                        </tr>
                      </tbody>
                    </>
                  )
                })}
              </table>

              <table >
                <thead>
                  <tr>
                    <th>Produto para Entrega</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {isLoadingDeliveryman ? (
                  <div className={styles.table}>
                    <h1>Loading ...</h1>
                  </div>
                ) : dataDeliveryman.map(deliveryDeliveryman => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{deliveryDeliveryman.order.product_name}</td>
                          {deliveryDeliveryman.status === 'available' ? (
                            <td style={{ backgroundColor: '#E73F5D', textAlign: 'center', fontWeight: '500' }}>Não Entregue</td>
                          ) : deliveryDeliveryman.status === 'delivered' ? (
                            <td style={{ backgroundColor: '#78E025', textAlign: 'center', fontWeight: '500' }}>Entregue</td>
                          ) :
                            <td style={{ backgroundColor: '#E9E125', textAlign: 'center', fontWeight: '500' }}>Aguardando Entrega</td>
                          }
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

export default Dashboard
