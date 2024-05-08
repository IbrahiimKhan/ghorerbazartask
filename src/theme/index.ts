import {Dimensions, Platform} from 'react-native';
import {createTheme} from '@shopify/restyle';

import {
  buttonTextVariants,
  buttonVariantsBase,
  buttonVariantsDisabled,
  buttonVariantsType,
} from './button-variants';
import {cardVariants} from './card-variants';
import {colors} from './colors';
import {dividerVariants} from './divider-variants';
import {iconButtonVariants} from './icon-button-variants';
import {
  inputVariantDisabledState,
  inputVariantErrorState,
  inputVariantFocusedState,
  inputVariantsBase,
  inputVariantSuccessState,
} from './input-variants';
import {
  fontFamily,
  fontSizes,
  fontWeights,
  textVariants,
} from './text-variants';

const {width, height} = Dimensions.get('window');

const sizes = {
  full: '100%',
  width,
  height,
  sideSpace: 20,
  safeWidth: width - 20 - 20,
  activeOpacity: 0.8,
  minHeaderHeight: 60,
};

const boxShadow = {
  ...Platform.select({
    ios: {
      shadowColor: colors.secondary100,
      shadowOffset: {width: 4, height: 4},
      shadowOpacity: 0.24,
      shadowRadius: 16,
    },
    android: {
      elevation: 2,
    },
  }),
};

const spacing = {
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 28,
  10: 32,
  12: 36,
  14: 40,
  16: 44,
  18: 48,
  20: 56,
  22: 64,
  24: 80,
  26: 96,
};

const borderRadii = {
  none: 0,
  'rounded-xs': 4,
  'rounded-sm': 8,
  rounded: 12,
  'rounded-md': 16,
  'rounded-lg': 20,
  'rounded-xl': 24,
  'rounded-xxl': 28,
  'rounded-hu': 33,
  'rounded-full': 9999,
};

const zIndices = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
};

const breakpoints = {};

const theme = createTheme({
  colors,
  borderRadii,
  textVariants,
  spacing,
  boxShadow,
  fontWeights,
  fontFamily,
  fontSizes,
  sizes,
  zIndices,
  breakpoints,
  buttonVariantsBase,
  buttonVariantsType,
  buttonVariantsDisabled,
  buttonTextVariants,
  cardVariants,
  dividerVariants,
  iconButtonVariants,
  inputVariantsBase,
  inputVariantDisabledState,
  inputVariantErrorState,
  inputVariantFocusedState,
  inputVariantSuccessState,
});

export type Theme = typeof theme;

export default theme;
