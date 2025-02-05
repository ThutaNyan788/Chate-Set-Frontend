import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './context/AppContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "./index.css"
import Router from './routers/Router';
import { Toaster } from './components/ui/toaster';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
      </AppContextProvider>
  </StrictMode>,
);