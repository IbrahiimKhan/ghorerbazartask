import React, {type ReactElement, type useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export const useHeader = (
  header: () => ReactElement,
  deps: Parameters<typeof useLayoutEffect>[1] = [],
): void => {
  const navigation = useNavigation();
  const Component = header;

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Component />,
    });
  }, [...deps, navigation, Component]);
};

export default useHeader;
