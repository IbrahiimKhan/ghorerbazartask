import {type FC, type PropsWithChildren, type ReactElement} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  layout,
  type LayoutProps,
  type VariantProps,
} from '@shopify/restyle';

import {type Theme} from '../../../theme';

import Image, {type ImageProps} from './Image';

type RestyleProps = VariantProps<Theme, 'imageBannerVariants'> &
  LayoutProps<Theme> &
  PropsWithChildren;

type ImageBannerProps = RestyleProps & ImageProps;

const variant = createVariant<Theme, 'imageBannerVariants'>({
  themeKey: 'imageBannerVariants',
});
const RestyleView = createRestyleComponent<RestyleProps, Theme>([
  variant,
  layout,
]);

export const ImageBanner: FC<ImageBannerProps> = ({
  image,
  ...rest
}): ReactElement => {
  return (
    <RestyleView>
      <Image image={image} style={styles.imageBanner} {...rest} />
    </RestyleView>
  );
};

export default ImageBanner;

const styles = StyleSheet.create({
  imageBanner: {
    flex: 1,
    width: '100%',
  },
});
