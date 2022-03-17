import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import React, { useContext, useState } from "react";
import Modal from 'react-modal';

import styles from '../styles/delivery.module.scss'
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

const MyProduct: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [preco, setPreco] = useState('20');
  const { user } = useContext(GoogleAuthContext);

  return (
    <>
      <Head>
        <title>Zephyrus | My Product</title>
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
                    <th>Produto</th>
                    <th>Largura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pudim</td>
                    <td>20cm</td>
                  </tr>
                </tbody>

                <thead>
                  <tr>
                    <th>Descricao</th>
                    <th>Altura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pudim de chocolate delicioso feito em casa</td>
                    <td>15cm</td>
                  </tr>
                </tbody>

                <thead>
                  <tr>
                    <th>Peso</th>
                    <th>Comprimento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>500g</td>
                    <td>20cm</td>
                  </tr>
                </tbody>

                <thead>
                  <tr>
                    <th>Origem</th>
                    <th>Destino</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>casa origem legal lorem</td>
                    <td>casa destino muito legal</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th>Entregador</th>
                    <th>Preço</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matheus</td>
                    <td>R${preco}</td>
                    <td style={{ color: 'green' }}>Aceitar</td>
                    <td style={{ color: 'red' }}>Recusar</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Wilson</td>
                    <td>R$35</td>
                    <td style={{ color: 'green' }}>Aceitar</td>
                    <td style={{ color: 'red' }}>Recusar</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Marlene</td>
                    <td>R$10</td>
                    <td style={{ color: 'green' }}>Aceitar</td>
                    <td style={{ color: 'red' }}>Recusar</td>
                  </tr>
                </tbody>

                <button onClick={() => setModalIsOpen(true)}
                  style={{ marginTop: '3rem', backgroundColor: 'rgb(255, 75, 75)', borderColor: 'grey' }}>
                  Não entregue
                </button>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProduct