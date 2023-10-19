import { useEffect } from 'react';
import { theme } from 'antd';
import { useQuery } from '@tanstack/react-query'
import { format, sub } from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR';
import { toast } from 'react-hot-toast/headless';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { currencyApi } from '../../services/apis'

interface ChartProps {
  from: string
  to: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { useToken } = theme;

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
        const rate = value && typeof value === 'object' ? Object.values(value)?.[0] : 0;
        const date = key && new Date(key) ? format(new Date(key), 'dd MMM', { locale: brLocale }) : ''
        return {
          date: date,
          rate: typeof rate === 'number' && !Number.isNaN(rate) ? Number(rate.toFixed(3)) : 0,
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

export const LineChart = ({ from = '', to = '' }: ChartProps) => {
  const {token} = useToken();
  const { error, data } = useQuery({
    queryKey: ['exchangesHistory', from, to],
    queryFn: async () => await fetchExchangeRatesHistory({ from, to })
  })

  const chartData = {
    labels: data?.map((history) => history.date),
    datasets: [
      {
        label: 'rate',
        data: data?.map((history) => history.rate),
        backgroundColor: '#ffffff',
        borderColor: token.colorPrimary

      }
    ]
  }

  useEffect(() => {
    if (!error) return;
    toast.error(`Failed to load exchanges history from ${from} to ${to}`)
  }, [error, from, to])

  return (
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: `${to} Rates History`,
            },
          },
        }}
        data={chartData} />
  )
}