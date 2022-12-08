import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { reduxStore } from './stores';

export function ProviderWrapper({ children }: any) {
  return (
    <HelmetProvider>
      <div className='App'>
        <CookiesProvider>
          <Provider store={reduxStore}>{children}</Provider>
        </CookiesProvider>
      </div>
    </HelmetProvider>
  );
}
