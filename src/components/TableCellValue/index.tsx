import { useQuery } from '@tanstack/react-query'
import { currencyApi } from '../../services/apis';
import { useEffect } from 'react'
import toast from 'react-hot-toast';


async function fetchExchangeRates({ from = '', to = '' }) {
  try {
    if (typeof from !== 'string') return null;
    if (from.trim().length === 0) return null;
    if (typeof to !== 'string') return null;
    if (to.trim().length === 0) return null;

    const { data } = await currencyApi.get(`/latest?amount=1&from=${from}&to=${to}`);
    const exchangeRate = data?.rates?.[to]
    if (typeof exchangeRate !== 'number') return null;

    return {
      exchangeRate,
      formatedExchangeRate: new Intl.NumberFormat('en-us', {
        minimumFractionDigits: 2,
        currency: "USD",
        style: 'currency',
      }).format(exchangeRate)
    }

  } catch (error) {
    console.dir(error)
  }
}

export const TableCellValue = ({ from = 'USD', to = '' }) => {
  const { error, data } = useQuery({
    queryKey: ['exchanges', from, to],
    queryFn: async () => await fetchExchangeRates({ from, to })
  })

  useEffect(() => {
    if (!error) return;
    toast.error(`Failed to load exchanges from ${from} to ${to}`)
  }, [error, from, to])

  return (
    <div>
      {data?.formatedExchangeRate || ''}
    </div>
  )
}