import React from 'react';
import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';
import {type BackgroundColorProps} from '@shopify/restyle';

import {type Theme} from '../../../theme';
import {useTheme} from '../../../theme/theme-provider';

import {Box} from '../layout/Box';

type RestyleProps = BackgroundColorProps<Theme>;

type LoaderProps = ActivityIndicatorProps & RestyleProps;

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  backgroundColor = 'primary',
  animating = true,
  hidesWhenStopped = true,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const color = theme.colors[backgroundColor as keyof typeof theme.colors];

  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
      zIndex={50}
      backgroundColor="overlay"
      {...rest}>
      <ActivityIndicator
        size={size}
        color={color}
        animating={animating}
        hidesWhenStopped={hidesWhenStopped}
        style={style}
        {...rest}
      />
    </Box>
  );
};

export default Loader;
