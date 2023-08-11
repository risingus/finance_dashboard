import { useQuery } from '@tanstack/react-query'
import { format, sub } from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR';
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

async function fetchExchangeRatesHistory({ from = '', to = '' }) {
  try {
    if (typeof from !== 'string') return [];
    if (from.trim().length === 0) return [];
    if (typeof to !== 'string') return [];
    if (to.trim().length === 0) return [];

    const date = format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd');

    const { data } = await currencyApi.get(`/${date}..?from=${from}&to=${to}`)
    const history = Object.entries(data.rates);

    const ratesHistory = Array.isArray(history)
      && history.length > 0
      ? history.map(([key, value]) => {
        const rate = value && typeof value === 'object' ? Object.values(value)?.[0] : 0
        const date = key && new Date(key) ? format(new Date(key), 'dd MMM', { locale: brLocale }) : ''
        return {
          date: date,
          rate: typeof rate === 'number' && !Number.isNaN(rate) ? Number(rate.toFixed(3)) : 0
        }
      })
        .filter((value) => value)
        .reverse()
      : [];

    return ratesHistory;

  } catch (error) {
    console.dir(error)
  }
}

async function fetchCardData({ from = '', to = '' }) {
  try {
    const [exchangeRate, history] = await Promise.all([fetchExchangeRates({ from, to }), fetchExchangeRatesHistory({ from, to })])

    return {
      exchangeRate,
      history
    }
  } catch (error) {
    console.log(error)
  }
}

export const CardCurrency = ({ from = '', to = '' }: CardCurrencyProps) => {
  const { error, data } = useQuery({
    queryKey: ['exchanges', from, to],
    queryFn: async () => await fetchCardData({ from, to })
  })

  if (error) return 'sorry...'

  return (
    <div>
      from: {from}
      to: {to}
      {data?.exchangeRate ?? 0}
      {
        data?.history
        && Array.isArray(data?.history)
        && data?.history?.length > 0
        && data?.history?.map((value) => {
          return (
            <div key={value?.date}>
              data: {value?.date}
              {' '}
              rate: {value?.rate}
            </div>
          )
        })
      }
    </div>
  )
}