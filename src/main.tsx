import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './core/context/AppContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AppProvider>,
);
