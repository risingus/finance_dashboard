import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { AppLayout } from './layouts/AppLayout'
import { dark, light } from './styles/theme';
import { useDarkMode } from './hooks/useDarkMode';
import './styles/styles-global.scss';
import { Home } from './pages/Home';
import { ExchangeProvider } from './context/exchangeProvider';


const queryClient = new QueryClient()

function App() {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const isDarkOs = useDarkMode();
  const theme = isDarkOs ? dark : light;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkOs ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: theme['--primary'],
          colorPrimaryHover:theme['--primary-light'],
          colorLinkHover: theme['--primary-light'],
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ExchangeProvider>
          <AppLayout>
            <Home />
          </AppLayout>
        </ExchangeProvider>
      </QueryClientProvider>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            background: theme['--background-content'],
            color: theme['--text-primary'],
            borderRadius: '15px',
          }
        }}
      />
    </ConfigProvider>
  )
}

export default App
