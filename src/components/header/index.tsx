import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>Nome do Usuário</div>
        <div className={styles.photoUser}></div>
      </div>
    </header>
  );
}