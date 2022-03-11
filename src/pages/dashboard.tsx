import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

import styles from '../styles/dashboard.module.scss'

const Dashboard: NextPage = () => {
  const { user } = useContext(GoogleAuthContext);

  return (
    <>
      <Head>
        <title>Zephyrus | Dashboard</title>
      </Head>
      <div className={styles.container}>
        <Header name={user.name} avatar={user.avatar} />
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
                <tbody>
                  <tr>
                    <td>Sapato</td>
                    <td style={{ backgroundColor: '#E73F5D', textAlign: 'center', fontWeight: '500' }}>Não Entregue</td>
                  </tr>
                </tbody>
              </table>

              <table >
                <thead>
                  <tr>
                    <th>Produto para Entrega</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Smart Tv</td>
                    <td style={{ backgroundColor: '#E9E125', textAlign: 'center', fontWeight: 500 }}>Aguardando Entrega</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard
