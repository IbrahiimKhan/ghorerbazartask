import React, {type FC, type ReactElement} from 'react';
import {type ViewProps} from 'react-native';
import {
  border,
  type BorderProps,
  createRestyleComponent,
  createVariant,
  type LayoutProps,
  spacing,
  type SpacingProps,
  type VariantProps,
} from '@shopify/restyle';

import {type Theme} from '../../../theme';

type DividerProps = VariantProps<Theme, 'dividerVariants'> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  ViewProps;

const variant = createVariant<Theme, 'dividerVariants'>({
  themeKey: 'dividerVariants',
});

const RestyleView = createRestyleComponent<DividerProps, Theme>([
  spacing,
  border,
  variant,
]);

export const Divider: FC<DividerProps> = ({
  height = 1,
  ...rest
}): ReactElement => {
  return <RestyleView height={height} {...rest} />;
};

export default Divider;
