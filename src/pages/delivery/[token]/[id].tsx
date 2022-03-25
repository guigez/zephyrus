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
import { api } from '../../../services/api/api';
import { getDelivery } from '../../../services/hooks/useDelivery';
import { useClient } from '../../../services/hooks/useClient';


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

  const { data } = useClient(product.id_client, user.token)

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
    try {
      await api.post(`deliveries/suggestion`,
        JSON.stringify({
          "deliveryId": product.id,
          "priceSuggestion": preco
        }),
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        })
      setModalIsOpen(false)
    }
    catch (error) {
      alert(error.response.data.message)
      setModalIsOpen(false)
    }
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
                    <th>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.name}</td>
                  </tr>
                </tbody>

                <button onClick={() => setModalIsOpen(true)} style={{
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
                }}>Sugerir Preço</button>
                <Modal
                  isOpen={modalIsOpen}
                  shouldCloseOnOverlayClick={false}
                  onRequestClose={() => setModalIsOpen(false)}
                  style={
                    {
                      content: {
                        borderRadius: '1rem',
                        width: '400px',
                        height: '300px',
                        marginLeft: '40%',
                        color: 'blue',
                        border: '0',
                        boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)',
                      }
                    }
                  }
                >
                  <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    alignItems: 'center',
                    color: '#2381FD',
                    font: '500 1rem "Roboto", sans-serif'

                  }}>
                    Sugira um preço para a entrega:
                    <p></p>
                    <input type='number' name="preco" placeholder="Sugira um Preço"
                      onChange={event => setPreco(event.target.value)}
                      style={{
                        marginTop: '4rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'center',
                        width: '20rem',
                        padding: '1rem',
                        border: '0',
                        borderBottom: '1px solid #eee',
                        boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)',
                        borderRadius: '1rem'
                      }} />
                  </label>
                  <p></p>
                  <input type="submit" value="Salvar" onClick={handleSubmitSuggestion}
                    style={
                      {
                        display: 'flex',
                        color: 'white',
                        backgroundColor: '#2381FD',
                        borderRadius: '4px',
                        font: '500 1rem "Roboto", sans-serif',
                        cursor: 'pointer',
                        border: '0',
                        height: '3rem',
                        width: '15rem',
                        paddingLeft: '6rem',
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '3rem'
                      }
                    }
                  />
                </Modal>
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

