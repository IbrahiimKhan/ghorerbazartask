import React, {type FC, type ReactElement} from 'react';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
  type ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {
  getImage,
  type Image as ImageType,
} from '../../../../assets/constants/images';

import {type IconProps} from './Icon';

export type ImageProps = Omit<RNImageProps, 'source'> &
  Omit<IconProps, 'variant' | 'icon'> & {
    image: ImageType | string;
    remote?: boolean;
  };

export const Image: FC<ImageProps> = ({
  image,
  remote = false,
  ...rest
}): ReactElement => {
  return (
    <RNImage
      source={
        remote
          ? {uri: image}
          : (getImage(image as ImageType) as ImageSourcePropType)
      }
      resizeMode="cover"
      style={styles.image}
      {...rest}
    />
  );
};

export default Image;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
});
