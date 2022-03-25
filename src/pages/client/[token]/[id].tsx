import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../../../components/header';
import { Sidebar } from '../../../components/sidebar';
import { Maps } from '../../../components/maps';
import { getCoord } from '../../../api/maps';
import React, { useContext } from "react";
import Modal from 'react-modal';

import styles from '../../../styles/delivery.module.scss'
import { useEffect, useState } from 'react';
import { GoogleAuthContext } from '../../../contexts/GoogleAuthContext';
import { getDeliveriesAvailable, useDeliveriesAvailable } from '../../../services/hooks/useDeliveriesAvailable';
import { api } from '../../../services/api/api';
import { METHODS } from 'http';
import { BsCheckCircle } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { getDelivery, useDelivery } from '../../../services/hooks/useDelivery';
import { useGoogleAuth } from '../../../services/hooks/useGoogleAuth';


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
    }
  }
}

export default function Delivery({ product }: ProductType) {

  const [origem, setOrigem] = useState({ lat: 0, lng: 0 });
  const [destino, setDestino] = useState({ lat: 0, lng: 0 });
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [preco, setPreco] = useState('(Nenhum Preço Sugerido)');
  const { user } = useContext(GoogleAuthContext);

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

  async function handleSubmitSuggestion() {

    const { data } = await api.post(`deliveries/suggestion`,
      JSON.stringify({
        "deliveryId": product.id,
        "priceSuggestion": preco
      }),
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc1MjQwMTcsImV4cCI6MTY0NzYxMDQxNywic3ViIjoiNjIyYTEyZjBkNjZhODgwZWVhMjRiNzhiIn0.y8S8G8D9VsOSRIgfTVimKl9E85Mv7iW2a6Yl0_iKHX8`,
        },
      })

    setModalIsOpen(false)
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
                    <th>Preço</th>
                    <th>Aceitar</th>
                    <th>Recusar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>14.55</td>
                    <td style={{ textAlign: 'center' }}>
                      <a><BsCheckCircle style={{
                        color: '#78E025',
                        fontSize: '2rem',
                        fontWeight: '800'
                      }}>
                      </BsCheckCircle></a></td>
                    <td style={{ textAlign: 'center' }}>
                      <a><IoIosCloseCircleOutline style={{
                        color: '#E73F5D',
                        fontSize: '2.5rem',
                        fontWeight: '800'
                      }} >
                      </IoIosCloseCircleOutline></a></td>
                  </tr>
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
    }
  }

  return {
    props: {
      product,
    }
  }
}

