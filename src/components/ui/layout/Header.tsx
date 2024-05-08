import React, {type PropsWithChildren, type ReactElement} from 'react';
import {useNavigation} from '@react-navigation/native';

import {IconButton, type IconButtonProps} from '../media-icons/IconButton';
import {Box} from './Box';
import {ContentSafeAreaView} from './ContentSafeAreaView';
import {useSafeAreaInsetsStyle} from '../../../hooks/useSafeAreaInsetsStyle';
import {useTheme} from '@shopify/restyle';
import {Text} from '../Text';

export const Header = ({children}: PropsWithChildren): ReactElement => {
  const theme = useTheme();
  const containerInsets = useSafeAreaInsetsStyle(['top'], 'margin');

  return (
    <Box
      height={theme.sizes.minHeaderHeight}
      style={containerInsets}
      bg="background">
      <ContentSafeAreaView height="100%" justifyContent="center">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          {children}
        </Box>
      </ContentSafeAreaView>
    </Box>
  );
};

const BackAction = ({onPress}: {onPress?: () => void}): ReactElement => {
  const navigation = useNavigation();
  const navigateBack = (): void => {
    navigation.goBack();
  };

  return (
    <IconButton
      right={14}
      variant="vector"
      type="material"
      icon="arrow-back"
      onPress={onPress ?? navigateBack}
    />
  );
};

const Content = ({
  title,
  subTitle = undefined,
}: {
  title: string;
  subTitle?: string | undefined;
}): ReactElement => {
  return (
    <Box>
      <Text variant="heading2">{title}</Text>
      {subTitle !== undefined && <Text variant="b3medium">{subTitle}</Text>}
    </Box>
  );
};

const Action = (
  props: {icon: string; onPress: () => void} & IconButtonProps,
): ReactElement => {
  return <IconButton {...props} left={14} />;
};

Header.BackAction = BackAction;
Header.Content = Content;
Header.Action = Action;

export default Header;
