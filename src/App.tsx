import React, {type ReactElement} from 'react';
import {ThemeProvider} from '@shopify/restyle';

import theme from './theme';

import 'react-native-gesture-handler';

import Navigator from './navigators';
import {store} from './store/store';
import {Provider} from 'react-redux';

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
};
