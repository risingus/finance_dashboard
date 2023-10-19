import { ModalCreateCurrency } from '../../components/ModalCreateCurrency';
import { useExchanges } from '../../context/exchangeProvider';
import { CurrencyCard } from '../../components/CurrencyCard';
import styles from './styles.module.scss'

export function Home() {
  const { exchanges } = useExchanges();

  return (
    <div className={styles.home}>
      <ModalCreateCurrency />
      <div className={styles.card_container}>
        {
          exchanges.map((exchange) => (
            <CurrencyCard description={exchange.description} id={exchange.id} key={exchange.id} />
          ))
        }
      </div>
    </div>
  )
}