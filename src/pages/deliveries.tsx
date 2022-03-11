import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';

import styles from '../styles/deliveries.module.scss'

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
                  <tr>
                    <td>Produto muito maneiro</td>
                    <td>casa muito legal lorem</td>
                    <td>casa destino muito legal</td>
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

export default Deliveries
