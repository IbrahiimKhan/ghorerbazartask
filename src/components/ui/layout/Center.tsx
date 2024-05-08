import React, {type FC, type PropsWithChildren} from 'react';
import {
  createRestyleComponent,
  layout,
  type LayoutProps,
  spacing,
  type SpacingProps,
  spacingShorthand,
  type SpacingShorthandProps,
} from '@shopify/restyle';

import {type Theme} from '../../../theme';

type CenterProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme> &
  PropsWithChildren;

const RestyleView = createRestyleComponent<CenterProps, Theme>([
  spacing,
  spacingShorthand,
  layout,
]);

export const Center: FC<CenterProps> = ({children, ...rest}) => {
  return (
    <RestyleView justifyContent="center" alignItems="center" {...rest}>
      {children}
    </RestyleView>
  );
};

export default Center;
