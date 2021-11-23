import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import App from './components/App/App';
import { theme } from './styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
