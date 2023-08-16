import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { currencyApi } from '../services/apis';

const fetchCurrencies = async () => {
  try {
    const { data } = await currencyApi.get(`/currencies`);

    const currenciesList = Object.entries(data)

    const formatedCurrenciesList = Array.isArray(currenciesList)
      && currenciesList.length > 0
      ? currenciesList.map(([key, value]) => {
        if (!key) return {}
        if (!value) return {};
        if (typeof key !== 'string') return {};
        if (typeof value !== 'string') return {};
        if (key.trim().length === 0) return {};
        if (value.trim().length === 0) return {};

        return {
          id: key,
          description: value
        }
      }).filter((item) => typeof item?.id === 'string' && typeof item?.description === 'string')
      : []

    return formatedCurrenciesList

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

  return data
}