import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CardCurrency } from './components/CardCurrency'
import { ModalCreateCurrency } from './components/ModalCreateCurrency'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div>
        <CardCurrency from='USD' to='BRL' />
        <ModalCreateCurrency />
    </div>
    </QueryClientProvider>
  )
}

export default App
