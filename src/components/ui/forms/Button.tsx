import React, {
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useContext,
  useMemo,
} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  type TextProps as RNTextProps,
  type TouchableOpacityProps,
} from 'react-native';
import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  color,
  type ColorProps,
  createRestyleComponent,
  createVariant,
  layout,
  type LayoutProps,
  spacing,
  type SpacingProps,
  spacingShorthand,
  type SpacingShorthandProps,
  typography,
  type TypographyProps,
  type VariantProps,
} from '@shopify/restyle';

import {type Theme} from '../../../theme';
import {
  type ButtonBaseType,
  type ButtonDisabledType,
  type ButtonTextType,
  type ButtonType,
} from '../../../theme/button-variants';

import {Box} from '../layout/Box';
import Icon, {type IconProps} from '../media-icons/Icon';
import {Text} from '../Text';

import Clickable from './Clickable';

type Props = VariantProps<Theme, 'buttonVariantsBase'> &
  VariantProps<Theme, 'buttonVariantsType', 'type'> &
  VariantProps<Theme, 'buttonVariantsDisabled', 'disabled'> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  PropsWithChildren;

const variant = createVariant({themeKey: 'buttonVariantsBase'});
const type = createVariant({themeKey: 'buttonVariantsType', property: 'type'});
const disabled = createVariant({
  themeKey: 'buttonVariantsDisabled',
  property: 'disabled',
});

const RestyleView = createRestyleComponent<Props, Theme>([
  layout,
  backgroundColor,
  border,
  variant,
  spacing,
  spacingShorthand,
  type,
  disabled,
]);

const types = {
  contained: 'Contained',
  outlined: 'Outlined',
  text: 'Text',
};

interface ButtonTextProps {
  title: string;
}

type TextProps = VariantProps<Theme, 'buttonTextVariants'> &
  TypographyProps<Theme> &
  ColorProps<Theme> &
  RNTextProps;

const textVariants = createVariant({themeKey: 'buttonTextVariants'});

const RestyleText = createRestyleComponent<TextProps, Theme>(
  [typography, color, textVariants],
  Text,
);

const ButtonText: FC<ButtonTextProps> = ({title}): ReactElement => {
  const {variant, type, disabled} =
    useContext<ButtonContextType>(ButtonContext);

  const textVariant = (variant + types[type]) as ButtonTextType;

  return (
    <Box>
      <RestyleText variant={disabled ? 'disabledText' : textVariant}>
        {title}
      </RestyleText>
    </Box>
  );
};

interface ButtonIconProps extends IconProps {}

const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  variant,
  color,
  size,
  ...rest
}): ReactElement => {
  return (
    <Box>
      <Icon icon={icon} variant={variant} size={size} color={color} {...rest} />
    </Box>
  );
};

interface ButtonContextType {
  type: ButtonType;
  variant: ButtonBaseType;
  disabled: boolean;
}

const ButtonContext = createContext<ButtonContextType>({
  variant: 'primary',
  type: 'contained',
  disabled: false,
});

const {Provider} = ButtonContext;

type ButtonProps = TouchableOpacityProps &
  Pick<Props, Exclude<keyof Props, 'disabled'>> & {
    disabled?: boolean;
    loading?: boolean;
  };

const Button = ({
  children,
  onPress,
  disabled = false,
  variant = 'primary',
  type = 'contained',
  loading = false,
  ...rest
}: ButtonProps): ReactElement => {
  const memorizedValue = useMemo(() => {
    return {
      variant,
      type,
      disabled,
    };
  }, [variant, type, disabled]);

  const disabledType = types[type] as ButtonType;

  return (
    <Provider value={memorizedValue}>
      <RestyleView
        variant={variant}
        type={type}
        {...(disabled && {
          disabled:
            `${disabledType.toLowerCase()}Disabled` as ButtonDisabledType,
        })}
        {...rest}>
        <Clickable onPress={onPress} disabled={disabled} style={styles.flex}>
          {loading ? <ActivityIndicator /> : children}
        </Clickable>
      </RestyleView>
    </Provider>
  );
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

const styles = StyleSheet.create({
  flex: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export {Button};
