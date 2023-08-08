import { useMemo } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CardCurrency } from './components/CardCurrency'
import { ModalCreateCurrency } from './components/ModalCreateCurrency'
import { AppLayout } from './layouts/AppLayout'
import { useThemeSelector } from './hooks/useThemeSelector';
import stylesDark from './styles/global-dark.module.scss';
import stylesLight from './styles/global-light.module.scss';

const queryClient = new QueryClient()

function App() {
  const isDarkTheme = useThemeSelector()

  const activeStyles = useMemo(() => {
    if (isDarkTheme) return stylesDark
    return stylesLight
  }, [isDarkTheme])

  return (
    <div className={activeStyles.body}>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <CardCurrency from='USD' to='BRL' />
          <ModalCreateCurrency />
        </AppLayout>
      </QueryClientProvider>
    </div>
  )
}

export default App
