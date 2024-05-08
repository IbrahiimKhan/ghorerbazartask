import React, {
  createContext,
  type PropsWithChildren,
  type ReactElement,
  useContext,
  useMemo,
  useState
} from 'react';
import { type ImageProps } from 'react-native';
import {
  backgroundColorShorthand,
  type BackgroundColorShorthandProps,
  border,
  type BorderProps,
  color,
  type ColorProps,
  createRestyleComponent,
  createVariant,
  layout,
  type LayoutProps,
  type PositionProps,
  useTheme,
  type VariantProps
} from '@shopify/restyle';

import { type TextType } from '@/models/theme-types';
import { type Theme } from '@/theme';
import { type AvatarType } from '@/theme/avatar-variants';

import { Box } from '../layout/Box';
import { Text } from '../Text';

import { AutoImage } from './AutoImage';

type AvatarProps = VariantProps<Theme, 'avatarVariants'> &
  BackgroundColorShorthandProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  PositionProps<Theme> &
  PropsWithChildren;

const variant = createVariant<Theme, 'avatarVariants'>({ themeKey: 'avatarVariants' });

const RestyleView = createRestyleComponent<AvatarProps, Theme>([
  backgroundColorShorthand,
  border,
  layout,
  variant,
  color
]);

type AutoImageProps = ImageProps;

const AvatarImage = ({ source, ...props }: AutoImageProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { variant } = useContext(AvatarContext);
  const [imageError, setImageError] = useState(false);

  const handleImageError = (): void => {
    setImageError(true);
  };

  return (
    <Box
      position="absolute"
      zIndex={10}
      justifyContent="center"
      alignItems="center"
      overflow="hidden">
      {imageError ? null : ( // Render fallback text or null if not provided
        <AutoImage
          source={source}
          onError={handleImageError}
          {...props}
          maxWidth={+theme.avatarVariants[variant].width}
          // maxHeight={theme.avatarVariants[variant].height}
        />
      )}
    </Box>
  );
};

type AvatarFallbackProps = PropsWithChildren;

const AvatarText = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 36,
  xl: 48,
  '2xl': 60
};

const AvatarFallback = ({ children }: AvatarFallbackProps): ReactElement => {
  const { variant } = useContext(AvatarContext);

  const fullName = children?.toString().split(' ') ?? [];
  const firstNameInitial = fullName[0]?.length > 0 ? fullName[0][0] : '';
  const lastNameInitial = fullName[1]?.length > 0 ? fullName[1][0] : '';

  const avatarTextVariant = `pt${AvatarText[variant]}w300regular` as TextType;

  return (
    <Text variant="b1bold" color="white">
      {firstNameInitial ?? ''}
      {lastNameInitial ?? ''}
    </Text>
  );
};

// type AvatarBadgeProps = PropsWithChildren & {
//   title: string;
// };

// const AvatarBadge = ({ children, title = '' }: AvatarBadgeProps): ReactElement => {
//   return <Box/>;
// };

interface AvatarContextType {
  variant: AvatarType;
}

const AvatarContext = createContext<AvatarContextType>({
  variant: 'md'
});

const { Provider } = AvatarContext;

const Avatar = ({ children, variant = 'md', bg = 'primary' }: AvatarProps): ReactElement => {
  const memorizedValue = useMemo(() => {
    return {
      variant
    };
  }, [variant]);

  return (
    <Provider value={memorizedValue}>
      <RestyleView variant={variant} bg={bg} position="relative" overflow="hidden">
        {children}
      </RestyleView>
    </Provider>
  );
};

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
// future implementations
// Avatar.Badge = AvatarBadge;

export { Avatar };

/*   How to use Avatar Component
    <Avatar variant="xs">
        <Avatar.Image
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }}
        />
        <Avatar.Fallback>Avatar</Avatar.Fallback>
      </Avatar> */
