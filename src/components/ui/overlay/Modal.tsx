import React, {type FC, type PropsWithChildren, type ReactElement} from 'react';
import {Modal as RNModal, type ModalBaseProps} from 'react-native';
import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  createRestyleComponent,
  layout,
  type LayoutProps,
  spacing,
  type SpacingProps,
} from '@shopify/restyle';

import {type Theme} from '../../../theme';

import {Box} from '../layout/Box';
import {Text} from '../Text';

type RestyleProps = SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  PropsWithChildren;

const RestyleView = createRestyleComponent<RestyleProps, Theme>([
  spacing,
  layout,
  border,
  backgroundColor,
]);

interface ModalProps extends ModalBaseProps, PropsWithChildren {
  visible: boolean;
}

const Modal = ({
  children,
  visible = false,
  ...rest
}: ModalProps): ReactElement => {
  return (
    <RNModal visible={visible} {...rest}>
      <Box
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
        flex={1}
        justifyContent="center"
        alignItems="center">
        {children}
      </Box>
    </RNModal>
  );
};

const ModalContainer: FC<RestyleProps> = ({children}) => (
  <RestyleView
    backgroundColor="white"
    borderColor="black"
    borderStyle="solid"
    borderRadius="rounded"
    marginHorizontal={6}
    borderWidth={1}
    alignItems="center">
    {children}
  </RestyleView>
);

const ModalHeader: FC<{title: string} & RestyleProps> = ({title, ...rest}) => (
  <RestyleView
    alignItems="center"
    justifyContent="center"
    paddingTop={4}
    {...rest}>
    <Text variant="heading1" textAlign="center">
      {title}
    </Text>
  </RestyleView>
);

const ModalBody: FC<RestyleProps> = ({children, ...rest}) => (
  <RestyleView
    justifyContent="center"
    paddingHorizontal={6}
    minHeight={100}
    {...rest}>
    {children}
  </RestyleView>
);

const ModalFooter: FC<RestyleProps> = ({children, ...rest}) => (
  <RestyleView
    {...rest}
    justifyContent="center"
    alignItems="center"
    padding={4}
    flexDirection="row">
    {children}
  </RestyleView>
);

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export {Modal};
