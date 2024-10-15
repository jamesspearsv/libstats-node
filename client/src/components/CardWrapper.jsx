import styles from './CardWrapper.module.css';

function CardWrapper({ children, style }) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

export default CardWrapper;
