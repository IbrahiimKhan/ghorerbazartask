import React, {type PropsWithChildren, type ReactElement} from 'react';
import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  createRestyleComponent,
  createVariant,
  layout,
  type LayoutProps,
  opacity,
  type OpacityProps,
  spacing,
  type SpacingProps,
  type VariantProps,
} from '@shopify/restyle';

import {type Theme} from '../../theme';
import {Text} from './Text';
import {Box} from './layout/Box';

export type CardProps = VariantProps<Theme, 'cardVariants'> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  PropsWithChildren;

const variant = createVariant<Theme, 'cardVariants'>({
  themeKey: 'cardVariants',
});

const RestyleView = createRestyleComponent<CardProps, Theme>([
  spacing,
  layout,
  border,
  backgroundColor,
  opacity,
  variant,
]);

interface CardTitleType {
  title: string;
}

export const CardTitle = ({title}: CardTitleType): ReactElement => {
  return (
    <Box padding={4}>
      <Text variant="heading2" color="black">
        {title}
      </Text>
    </Box>
  );
};

export const CardContent = ({children}: PropsWithChildren): ReactElement => {
  return <Box padding={4}>{children}</Box>;
};

/* export const CardCover = (): void => {
  //
}; */

export const CardActions = ({children}: PropsWithChildren): ReactElement => {
  return <Box padding={4}>{children}</Box>;
};

export const Card = ({
  children,
  borderRadius,
  ...rest
}: CardProps): ReactElement => {
  return (
    <RestyleView borderRadius={borderRadius} {...rest}>
      {children}
    </RestyleView>
  );
};

Card.Title = CardTitle;
Card.Content = CardContent;
/* Card.CardCover = CardCover; */
Card.Actions = CardActions;

export default Card;
