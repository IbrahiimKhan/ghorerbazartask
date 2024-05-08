import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

export const icons = {};

export type Icon = keyof typeof icons;

export const getIcon = (iconKey: Icon): FC<SvgProps> => {
  return icons[iconKey];
};
