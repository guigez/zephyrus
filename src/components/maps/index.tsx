import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import styles from './styles.module.scss'


const Origem = () => (
  <div className={styles.pin1}>
  </div>
  
);

const Destino = () => (
  <div className={styles.pin2}>
  </div>
  
);



export function Maps(props : any){

    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter= {{lat: 0 , lng:0}}
          defaultZoom={16}
          center={props.center}

        >
          <Origem 
            lat ={props.origem.lat} 
            lng={props.origem.lng} 

          />

          <Destino 
            lat ={props.destino.lat} 
            lng={props.destino.lng}  

          />
        </GoogleMapReact>

      </div>

    );

}
