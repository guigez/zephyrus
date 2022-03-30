import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../../../components/header';
import { Sidebar } from '../../../components/sidebar';
import { Maps } from '../../../components/maps';
import { getCoord } from '../../../api/maps';
import React, { useContext } from "react";


import styles from '../../../styles/delivery.module.scss'
import { useEffect, useState } from 'react';
import { GoogleAuthContext } from '../../../contexts/GoogleAuthContext';
import { api } from '../../../services/api/api';
import { BsCheckCircle } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { getDelivery } from '../../../services/hooks/useDelivery';
import { useSuggestionsAvailable } from '../../../services/hooks/useSuggestionAvailable';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import Router from 'next/router';


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
  /*suggestions: [
    {
      id: string,
      id_deliveryman: string,
      id_delivery: string,
      price: string,
      deliveryman: {
        id: string,
        id_google: string,
        email: string,
        name: string
      }
    }
  ]*/
}

export default function Delivery({ product }: ProductType) {

  const [origem, setOrigem] = useState({ lat: 0, lng: 0 });
  const [destino, setDestino] = useState({ lat: 0, lng: 0 });
  const { user } = useContext(GoogleAuthContext);


  const { data: suggestions, isLoading } = useSuggestionsAvailable(product.id, user.token)

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

  async function handleDeclineSuggestion(id: string) {
    var suggestion = JSON.stringify({
      "suggestionId": id,
    });

    var headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    };

    const { data } = await api.delete(`deliveries/suggestion/decline/${id}`, { headers })

    if (data.id)
      Router.push('/dashboard')
  }

  async function handleAcceptSuggestion(id: string) {

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
                    <th>Preço</th>
                    <th>Aceitar</th>
                    <th>Recusar</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (<td>Loading...</td>) : suggestions.length === 0 ? (<h1>Sem sugestão</h1>) : suggestions.map(suggestion => {
                    return (
                      <>
                        <tr key={suggestion.id}>
                          <td>{suggestion.deliveryman.name}</td>
                          <td>{suggestion.price}</td>
                          <td style={{ textAlign: 'center' }}>
                            <Link href={`/suggestion/${user.token}/${product.id}`}>
                              <BsCheckCircle style={{
                                color: '#78E025',
                                fontSize: '2rem',
                                fontWeight: '800'
                              }}>
                              </BsCheckCircle></Link></td>
                          <td style={{ textAlign: 'center' }}>
                            <a onClick={() => handleDeclineSuggestion(suggestion.id)}><IoIosCloseCircleOutline style={{
                              color: '#E73F5D',
                              fontSize: '2.5rem',
                              fontWeight: '800'
                            }} >
                            </IoIosCloseCircleOutline></a></td>
                        </tr>
                      </>
                    )
                  })}
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
      //suggestions
    }
  }
}

