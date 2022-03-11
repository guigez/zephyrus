import styles from './styles.module.scss'

export function InfoOrders() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.infoOrders}>
          <div className={styles.title}>
            Produto
          </div>
          <div className={styles.title}>
            Descrição
          </div>
        </div>
        <div className={styles.infoOrders}>
          <div className={styles.title}>
            Largura
          </div>
          <div className={styles.title}>
            Altura
          </div>
          <div className={styles.title}>
            Comprimento
          </div>
          <div className={styles.title}>
            Peso
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.infoLocality}>
          <div className={styles.infoLocality}>
            <div className={styles.title}>
              Origem
            </div>
          </div>
          <div className={styles.infoLocality}>
            <div className={styles.title}>
              Destino
            </div>
          </div>
        </div>
        <div className={styles.map}>
          MAP
        </div>
      </div>
    </div>
  );
}