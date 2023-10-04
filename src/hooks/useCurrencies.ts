import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { currencyApi } from '../services/apis';

const fetchCurrencies = async () => {
  try {
    const { data } = await currencyApi.get(`/currencies`);
    if (!data) return []
    if (typeof data !== 'object') return []

    const currenciesList = Object.entries(data);

    const formatedCurrenciesList = Array.isArray(currenciesList)
      && currenciesList.length > 0
      ? currenciesList.map(([key, value]) => {
        if (!key) return null
        if (!value) return null;
        if (typeof key !== 'string') return null;
        if (typeof value !== 'string') return null;
        if (key.trim().length === 0) return null;
        if (value.trim().length === 0) return null;

        return {
          id: key,
          description: value,
          label: key
        }
      })
      : []

    return Array.isArray(formatedCurrenciesList)
      ? formatedCurrenciesList.filter((item) => item?.id && typeof item?.id === 'string' && item?.description && typeof item?.description === 'string') as Array<NonNullable<typeof formatedCurrenciesList[0]>>
      : []

  } catch (error) {
    if (isAxiosError(error) && error?.request?.status === 404) return []
    throw error;
  }
}

export const useCurrencies = () => {
  const { data, error } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => await fetchCurrencies()
  })

  useEffect(() => {
    if (!error) return;
    toast.error('Failed to load currencies list')
  }, [error])

  return data ?? []
}