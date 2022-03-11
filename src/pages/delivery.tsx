import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { Maps } from '../components/maps';
import { getCoord } from '../api/maps';
import Modal from 'react-modal';

import styles from '../styles/delivery.module.scss'
import { useEffect, useState } from 'react';




function buscarCoordenada(endereco : string) {
  endereco = endereco.replace(' ', '+');
  return getCoord(endereco);
}



const Delivery: NextPage = () => {
  const [origem, setOrigem] = useState({lat: 0, lng: 0});
  const [destino, setDestino] = useState({lat: 0, lng: 0});
  const[modalIsOpen, setModalIsOpen] = useState(false)
  const[preco, setPreco] = useState('(Nenhum Preço Sugerido)');

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
                    <th>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alessandro</td>
                  </tr>
                </tbody>

                <button onClick={() => setModalIsOpen(true)} style={{marginTop: '3rem'}}>Sugerir Preço</button>
                <Modal 
                  isOpen={modalIsOpen} 
                  shouldCloseOnOverlayClick={false} 
                  onRequestClose={() => setModalIsOpen(false)}
                  style={
                    {
                      content: {
                        borderRadius: '8px',
                        width: '400px',
                        height: '300px',
                        marginLeft: '40%',
                        color: 'blue',
                      }
                    }
                  }
                >
                    <label style={{marginLeft: '20%'}}>
                      Sugira um preço para a entrega:
                      <p></p>
                      <input type='number' name="preco" placeholder="Preço sugerido" onChange={event => setPreco(event.target.value)} style={{marginTop: '4rem', marginLeft: '29%', width: '41%'}}/>
                    </label>
                    <p></p>
                    <input type="submit" value="Salvar" onClick={() => setModalIsOpen(false)}
                    style={
                      {
                        backgroundColor: 'cornflowerblue',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '20px',
                        border: '2px solid blue',
                        padding: '14px 40px',
                        textAlign: 'center',
                        marginLeft: '30%',
                        marginTop: '3rem',
                      }
                    }
                    />
                </Modal>
                <p style={{marginTop: '1rem', fontSize: '20px'}}>Preço sugerido: R${preco}</p>
              </table>
            </div>

            <div className= {styles.map}>
              <Maps center = {origem} origem= {origem} destino= {destino}/>
            </div>
          </div>
        </div>
      </div>


        

      
    </>
  );
}

export default Delivery