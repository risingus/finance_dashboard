import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { currencyApi } from '../services/apis';

const currenciesStorageKey = '@finance_dashboard@currencies'

const fetchCurrencies = async () => {
  try {
    const storedCurrencies = localStorage.getItem(currenciesStorageKey);
    const localCurrencies = storedCurrencies ? JSON.parse(storedCurrencies) : [];

    if (Array.isArray(localCurrencies) && localCurrencies.length > 0) return localCurrencies;

    const { data } = await currencyApi.get(`/currencies`);
    if (!data) return []
    if (typeof data !== 'object') return []

    const currenciesList = Object.values(data)

    const formatedCurrenciesList = Array.isArray(currenciesList)
      && currenciesList.length > 0
      ? currenciesList.reduce((accumulator: any, current: any) => {
        if (typeof current?.code !== 'string') return accumulator
        if (typeof current?.name !== 'string') return accumulator
        return [
          ...accumulator,
          {
            id: current.code,
            description: current.name
          }
        ]
      }, [])
      : [] 

      if (Array.isArray(formatedCurrenciesList) && formatedCurrenciesList.length > 0) {
        localStorage.setItem(currenciesStorageKey, JSON.stringify(formatedCurrenciesList))
      }

      return Array.isArray(formatedCurrenciesList) ? formatedCurrenciesList as Array<NonNullable<typeof formatedCurrenciesList[0]>> : []

  } catch (error) {
    if (isAxiosError(error) && error?.request?.status === 404) return []
    throw error;
  }
}

export const useCurrencies = () => {
  const { data, error } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => await fetchCurrencies(),
    placeholderData: [],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10000, // ? 10000 minutos
  })

  useEffect(() => {
    if (!error) return;
    toast.error('Failed to load currencies list')
  }, [error])

  return data ?? []
}