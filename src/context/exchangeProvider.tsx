import { createContext, ReactNode, useContext, useReducer } from 'react';
import { exchangesReducer } from '../reducers/exchangesReducer/reducer';
import toast from 'react-hot-toast';

interface ExchangeProviderProps {
  children: ReactNode
}
interface CurrencyProps {
  id: string
  description: string
}

interface ExchangeContextProps {
  exchanges: CurrencyProps[]
  addExchange: (currency: CurrencyProps) => void
}

const ExchangeContext = createContext({} as ExchangeContextProps);
const exchangesStorageKey = '@finance_dashboard@exchanges'

const initialState = () => {
  const storedExchanges = localStorage.getItem(exchangesStorageKey);
  const localExchanges = storedExchanges ? JSON.parse(storedExchanges) : [];
  return {
    exchanges: Array.isArray(localExchanges) ? localExchanges : []
  }
}

const ExchangeProvider = ({ children }: ExchangeProviderProps) => {
  const [state, dispatch] = useReducer(exchangesReducer, { exchanges: [] }, initialState)

  const addExchange = (currency: CurrencyProps) => {
    if (!currency) return;
    if (typeof currency?.id !== 'string') return;
    if (typeof currency?.description !== 'string') return;

    const storedExchanges = localStorage.getItem(exchangesStorageKey);
    const localExchanges = storedExchanges ? JSON.parse(storedExchanges) : [];

    const onList = Array.isArray(localExchanges)
      ? localExchanges.find((storedCurrency) => storedCurrency?.id === currency.id)
      : null

    if (onList) {
      toast(`Currency ${currency.description} is already on the list`)
      return;
    }

    const newExchanges = [
      ...(Array.isArray(localExchanges) ? localExchanges : []),
      currency
    ]

    localStorage.setItem(exchangesStorageKey, JSON.stringify(newExchanges));
    dispatch({
      type: 'ADD_EXCHANGE',
      payload: currency
    })
  }

  return (
    <ExchangeContext.Provider value={{ ...state, addExchange }}>
      {children}
    </ExchangeContext.Provider>
  )
}

const useExchanges = () => {
  return useContext(ExchangeContext)
}

export { ExchangeProvider, useExchanges }