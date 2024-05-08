import React, {type FC, type PropsWithChildren, type ReactElement} from 'react';
import {TextInput, type TextInputProps} from 'react-native';
import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  createRestyleComponent,
  createVariant,
  spacing,
  type SpacingProps,
  type VariantProps,
  ColorProps,
} from '@shopify/restyle';

import {Text, VStack} from '../../../components';
import {type Theme} from '../../../theme';

type Props = VariantProps<Theme, 'inputVariantsBase'> &
  VariantProps<Theme, 'inputVariantDisabledState', 'disabled'> &
  VariantProps<Theme, 'inputVariantFocusedState', 'focused'> &
  VariantProps<Theme, 'inputVariantErrorState', 'error'> &
  VariantProps<Theme, 'inputVariantSuccessState', 'success'> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  SpacingProps<Theme> &
  PropsWithChildren;

const variant = createVariant({
  themeKey: 'inputVariantsBase',
  property: 'variant',
});
const disabled = createVariant({
  themeKey: 'inputVariantDisabledState',
  property: 'disabled',
});
const focused = createVariant({
  themeKey: 'inputVariantFocusedState',
  property: 'focused',
});
const error = createVariant({
  themeKey: 'inputVariantErrorState',
  property: 'error',
});
const success = createVariant({
  themeKey: 'inputVariantSuccessState',
  property: 'success',
});

const RestyleView = createRestyleComponent<Props, Theme>([
  variant,
  disabled,
  focused,
  error,
  success,
  backgroundColor,
  border,
  spacing,
]);

type InputProps = TextInputProps &
  Pick<
    Props,
    Exclude<keyof Props, 'disabled' | 'focused' | 'error' | 'success'>
  > & {
    disabled?: boolean;
    focused?: boolean;
    error?: boolean;
    success?: boolean;
    label?: string;
    labelColor?: ColorProps<Theme>['color'];
  };

export const Input: FC<InputProps> = ({
  variant = 'outline',
  disabled = false,
  focused = false,
  error = false,
  success = false,
  label,
  labelColor = 'black',
  placeholder = 'Type something',
  ...rest
}): ReactElement => {
  return (
    <VStack marginVertical={5} width="100%">
      {label ? (
        <Text color={labelColor} mb={5} variant="b1semiBold">
          {label}
        </Text>
      ) : null}
      <RestyleView
        variant={variant}
        {...(focused && {focused: `${variant}Focused`})}
        {...(error && {error: `${variant}Error`})}
        {...(success && {success: `${variant}Success`})}
        {...(disabled && {disabled: `${variant}Disabled`})}>
        <TextInput {...rest} editable={!disabled} placeholder={placeholder} />
      </RestyleView>
    </VStack>
  );
};
