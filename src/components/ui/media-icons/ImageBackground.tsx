import React, {type FC, type ReactElement} from 'react';
import {
  ImageBackground as RNImageBackground,
  type ImageBackgroundProps as RNImageBackgroundProps,
  type ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {getImage, type Image as ImageType} from '@assets/constants/images';

import {type IconProps} from './Icon';

type ImageBackgroundProps = Omit<RNImageBackgroundProps, 'source'> &
  Omit<IconProps, 'variant' | 'icon'> & {
    image: ImageType;
  };

// TODO: For now just image support , later we add support for remote images as well
export const ImageBackground: FC<ImageBackgroundProps> = ({
  children,
  image,
}): ReactElement => {
  return (
    <RNImageBackground
      source={getImage(image as ImageType) as ImageSourcePropType}
      resizeMode="cover"
      style={styles.image}>
      {children}
    </RNImageBackground>
  );
};

export default ImageBackground;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
});
