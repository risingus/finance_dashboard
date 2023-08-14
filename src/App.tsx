import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

import { CardCurrency } from './components/CardCurrency'
import { ModalCreateCurrency } from './components/ModalCreateCurrency'
import { AppLayout } from './layouts/AppLayout'
import './styles/styles-global.scss';

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <CardCurrency from='USD' to='BRL' />
          <ModalCreateCurrency />
        </AppLayout>
      </QueryClientProvider>
      <Toaster position='top-center' />
    </>
  )
}

export default App
