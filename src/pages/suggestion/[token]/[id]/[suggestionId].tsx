import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import React, { useContext } from "react";


import styles from '../../../../styles/delivery.module.scss'
import { useEffect, useState } from 'react';
import { GoogleAuthContext } from '../../../../contexts/GoogleAuthContext';
import { getCoord } from '../../../../api/maps';
import { Header } from '../../../../components/header';
import { Sidebar } from '../../../../components/sidebar';
import { Maps } from '../../../../components/maps';
import { getDelivery } from '../../../../services/hooks/useDelivery';
import Link from 'next/link';
import { stripe } from '../../../../services/stripe';
import { getSuggestionById } from '../../../../services/hooks/getSuggestionById';
import { getStripeJs } from '../../../../services/stripe-js';
import { api } from '../../../../services/api/api';
import { apiFront } from '../../../../services/api/apiFront';
import { useSession } from 'next-auth/react';


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
  },
  suggestion: {
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
  },
  price: {
    id: string
  }
}

export default function Delivery({ product, suggestion, price }: ProductType) {

  const [origem, setOrigem] = useState({ lat: 0, lng: 0 });
  const [destino, setDestino] = useState({ lat: 0, lng: 0 });
  const { data: session } = useSession();

  //const { data: suggestions, isLoading } = useSuggestionsAvailable(product.id, user.token)

  //const suggestion = suggestions.find((element) => element.id == suggestion.id)

  useEffect(() => {
    //origem
    buscarCoordenada(product.origin).then(e => {
      setOrigem(e.data.results[0].geometry.location)

    })

    //destino
    buscarCoordenada(product.destiny).then(e => {
      setDestino(e.data.results[0].geometry.location)
    })
  }, []);

  async function handlePay() {
    console.log('stripe')

    try {
      const request = {
        email: session.user.email,
        priceId: price.id
      }

      const response = await apiFront.post('/stripeSession', request);

      const { sessionId } = response.data;

      const str = await getStripeJs();

      await str.redirectToCheckout({ sessionId });

    } catch (err) {
      alert('err ao realizar pagamento ' + err);
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
                    <th>Entregador</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{suggestion.deliveryman.name}</td>
                </tbody>

                <thead>
                  <tr>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{suggestion.price}</td>
                </tbody>

                <tbody>
                  <button onClick={() => handlePay()} style={{
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
                  }}>Pagar</button>

                  <Link href={'/dashboard'}>
                    <button style={{
                      color: 'white',
                      backgroundColor: '#737380',
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
                      marginTop: '1rem'
                    }}>Cancelar</button>
                  </Link>

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
  )
};



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, id, suggestionId } = context.params;

  const delivery = await getDelivery(id.toString(), token.toString());

  const suggestion = await getSuggestionById(suggestionId.toString(), token.toString());



  const deliveryProduct = await stripe.products.create({ name: delivery.order.product_name });

  const priceStripe = await stripe.prices.create({
    unit_amount: parseFloat(suggestion.price) * 100, //em centavos
    currency: 'brl',
    product: `${deliveryProduct.id}`,
  });

  const price = {
    id: priceStripe.id
  }

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
      suggestion,
      price,
    }
  }
}

