import React, {type FC, type ReactElement} from 'react';
import {type ColorProps, type SpacingProps} from '@shopify/restyle';

import {type Theme} from '../../../theme';
import {getVectorIcon, type IconKeys} from '../../../utils/vectorIcons';
import {useTheme} from '../../../theme/theme-provider';

export interface VectorIconProps {
  type?: IconKeys;
  name: string;
  size?: SpacingProps<Theme>['gap'];
  color?: ColorProps<Theme>['color'];
}

export const VectorIcon: FC<VectorIconProps> = ({
  type = 'material',
  size = 6,
  color = 'black',
  ...rest
}): ReactElement => {
  const theme = useTheme();
  const FontIcon = getVectorIcon(type);
  const iconColor = theme.colors[color as keyof typeof theme.colors];
  const iconSize = theme.spacing[size as keyof typeof theme.spacing];
  return <FontIcon {...rest} color={iconColor} size={iconSize} />;
};

export default VectorIcon;
