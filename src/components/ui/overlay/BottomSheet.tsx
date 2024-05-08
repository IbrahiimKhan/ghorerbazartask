import React, {type FC, type ReactElement, type ReactNode} from 'react';

import {Box, Modal} from '../../../components';
import theme from '../../../theme';

interface BottomSheetProps {
  isVisible: boolean;
  children: ReactNode;
}

export const BottomSheet: FC<BottomSheetProps> = ({
  isVisible = false,
  children,
}): ReactElement => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <Box
        elevation={40}
        backgroundColor="primary"
        bottom={0}
        position="absolute"
        width="100%"
        height={theme.sizes.height / 2}
        borderTopLeftRadius="rounded-xl"
        borderTopRightRadius="rounded-xl"
        paddingTop={7}>
        {children}
      </Box>
    </Modal>
  );
};

export default BottomSheet;
