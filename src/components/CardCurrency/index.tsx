import { useQuery } from '@tanstack/react-query'
import { currencyApi } from '../../services/apis'

interface CardCurrencyProps {
  from: string
  to: string
}

async function fetchExchangeRates({ from = '', to = '' }) {
  try {
    if (typeof from !== 'string') return null;
    if (from.trim().length === 0) return null;
    if (typeof to !== 'string') return null;
    if (to.trim().length === 0) return null;

    const { data } = await currencyApi.get(`/latest?amount=1&from=${from}&to=${to}`);

    const exchangeRate = data?.rates?.[to]

    if (typeof exchangeRate !== 'number') return null;

    return exchangeRate;

  } catch (error) {
    console.dir(error)
  }
}

export const CardCurrency = ({ from = '', to = '' }: CardCurrencyProps) => {
  const { error, data: exchangeRate } = useQuery({
    queryKey: ['exchanges', from, to],
    queryFn: async () => await fetchExchangeRates({ from, to })
  })

  if (error) return 'sorry...'

  return (
    <div>
      from: {from}
      to: {to}
      {exchangeRate}
    </div>
  )
}