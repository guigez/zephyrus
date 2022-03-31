import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import React, { useContext } from "react";


import styles from '../../../styles/delivery.module.scss'
import { useEffect, useState } from 'react';
import { GoogleAuthContext } from '../../../contexts/GoogleAuthContext';
import { getCoord } from '../../../api/maps';
import { Header } from '../../../components/header';
import { Sidebar } from '../../../components/sidebar';
import { Maps } from '../../../components/maps';
import { getDelivery } from '../../../services/hooks/useDelivery';
import { api } from '../../../services/api/api';
import router from 'next/router';


function buscarCoordenada(endereco: string) {
  endereco = endereco.replace(' ', '+');
  return getCoord(endereco);
}

type ProductType = {
  product: {
    id: string,
    id_client: string,
    id_deliveryman: string,
    id_order: string,
    origin: string,
    destiny: string,
    price?: string,
    status: string,
    created_at: string,
    update_at: string,
    order: {
      id: string,
      product_name: string,
      width: string,
      height: string,
      length: string,
      weight: string,
      description: string,
    },
    deliveryman: {
      name: string,
    },
  }
  token: string
}

export default function Delivery({ product, token }: ProductType) {

  const [origem, setOrigem] = useState({ lat: 0, lng: 0 });
  const [destino, setDestino] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    //origem
    buscarCoordenada('rua genesio ferreira martins, 81').then(e => {
      setOrigem(e.data.results[0].geometry.location)

    })

    //destino
    buscarCoordenada('Rua Orlando Bismara, 130 - Jardim Nova Manchester, Sorocaba - SP, 18052-015').then(e => {
      setDestino(e.data.results[0].geometry.location)
    })
  }, []);

  async function handleDelivered(id_delivery: string) {
    await api.put('/delivery/status', { id_delivery, status: 'delivered' }, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>Zephyrus | Delivery</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.main}>
            <div className={styles.tables}>
              <table className={styles.productTable}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Largura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.order.product_name}</td>
                    <td>{product.order.width}</td>
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
                    <td>{product.order.description}</td>
                    <td>{product.order.height}</td>
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
                    <td>{product.order.weight}</td>
                    <td>{product.order.length}</td>
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
                    <td>{product.origin}</td>
                    <td>{product.destiny}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th>Entregador</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{product.deliveryman.name}</td>
                </tbody>

                <thead>
                  <tr>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{product.price ? product.price : 14.54}</td>
                </tbody>

                <tbody>
                  <button onClick={() => handleDelivered(product.id)} style={{
                    color: 'white',
                    backgroundColor: '#2381FD',
                    borderRadius: '4px',
                    font: '500 1rem "Roboto", sans-serif',
                    cursor: 'pointer',
                    border: '0',
                    height: '3rem',
                    width: '20rem',
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlignLast: 'center',
                    marginTop: '15rem'
                  }}>Confirmar Entrega</button>

                </tbody>
              </table>
            </div>

            <div className={styles.map}>
              <Maps center={origem} origem={origem} destino={destino} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, id } = context.params;


  const delivery = await getDelivery(id.toString(), token.toString());

  const product = {
    id: delivery.id,
    id_client: delivery.id_client,
    id_deliveryman: delivery.id_deliveryman,
    id_order: delivery.id_order,
    origin: delivery.origin,
    destiny: delivery.destiny,
    price: delivery.price,
    status: delivery.status,
    created_at: delivery.created_at,
    update_at: delivery.update_at,
    order: {
      id: delivery.order.id,
      product_name: delivery.order.product_name,
      width: delivery.order.width,
      height: delivery.order.height,
      length: delivery.order.length,
      weight: delivery.order.weight,
      description: delivery.order.description
    },
    deliveryman: {
      name: delivery.deliveryman.name
    }
  }

  return {
    props: {
      product,
      token
    }
  }
}

