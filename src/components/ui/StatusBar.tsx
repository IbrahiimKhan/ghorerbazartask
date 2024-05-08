import React, {type FC, type ReactElement} from 'react';
import {
  StatusBar as RNStatusBar,
  type StatusBarProps as RNStatusBarProps,
} from 'react-native';
import {createRestyleComponent} from '@shopify/restyle';

import {type Theme} from '../../theme';

interface StatusBarProps extends Omit<RNStatusBarProps, 'backgroundColor'> {
  backgroundColor?: keyof Theme['colors'];
}

const RestyleStatusBar = createRestyleComponent<StatusBarProps, Theme>(
  [],
  RNStatusBar,
);

export const StatusBar: FC<StatusBarProps> = (props): ReactElement => {
  return <RestyleStatusBar {...props} />;
};

export default StatusBar;
