import React, {
  type PropsWithChildren,
  type ReactElement,
  useRef,
  useState,
} from 'react';
import {
  type LayoutChangeEvent,
  ScrollView,
  type ScrollViewProps,
  type StatusBarProps as RNStatusBarProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {type BackgroundColorProps} from '@shopify/restyle';

import {
  useSafeAreaInsetsStyle,
  type ExtendedEdge,
} from '../../../hooks/useSafeAreaInsetsStyle';
import {type Theme} from '../../../theme';

import {Loader} from '../feedback/Loader';
import KeyboardAvoidingView from '../KeyboardAvoidingView';
import {StatusBar} from '../StatusBar';

import {Box} from './Box';

type ScreenPreset = 'fixed' | 'scroll' | 'auto';

interface BaseScreenProps
  extends Omit<RNStatusBarProps, 'backgroundColor'>,
    PropsWithChildren {
  loading?: boolean;
  background?: BackgroundColorProps<Theme>['backgroundColor'];
  barBackground?: keyof Theme['colors'];
  safeAreaEdges?: ExtendedEdge[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  ScrollViewProps?: ScrollViewProps;
}
interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto';
  scrollEnabledToggleThreshold?: {percent?: number; point?: number};
}

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

const isNonScrolling = (preset?: ScreenPreset): boolean => {
  return !preset || preset === 'fixed';
};

const useAutoPreset = (
  props: AutoScreenProps,
): {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
} => {
  const {preset, scrollEnabledToggleThreshold} = props;
  const {percent = 0.92, point = 0} =
    scrollEnabledToggleThreshold != null || {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const updateScrollState = (): void => {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    ) {
      return;
    }

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) {
      setScrollEnabled(false);
    }

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) {
      setScrollEnabled(true);
    }
  };

  const onContentSizeChange = (w: number, h: number): void => {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  };

  const onLayout = (e: LayoutChangeEvent): void => {
    const {height} = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  };

  // update scroll state on every render
  if (preset === 'auto') {
    updateScrollState();
  }

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
};

const ScreenWithoutScrolling = (props: ScreenProps): ReactElement => {
  const {children, style, contentContainerStyle} = props;
  return (
    <Box flex={1} height="100%" width="100%" style={style}>
      <Box flex={1} height="100%" width="100%" style={contentContainerStyle}>
        {children}
      </Box>
    </Box>
  );
};

const ScreenWithScrolling = (props: ScreenProps): ReactElement => {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    ScrollViewProps,
    style,
    contentContainerStyle,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const {scrollEnabled, onContentSizeChange, onLayout} = useAutoPreset(
    props as AutoScreenProps,
  );

  useScrollToTop(ref);

  return (
    <ScrollView
      {...{keyboardShouldPersistTaps, scrollEnabled, ref}}
      {...ScrollViewProps}
      onLayout={e => {
        onLayout(e);
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[styles.outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {children}
      <Box height={80} />
    </ScrollView>
  );
};

export const Screen: React.FC<ScreenProps> = props => {
  const {
    loading = false,
    background = 'background',
    barBackground = 'transparent',
    barStyle = 'dark-content',
    safeAreaEdges,
    preset,
  } = props;

  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <Box
      flex={1}
      width="100%"
      height="100%"
      backgroundColor={background}
      style={containerInsets}>
      <StatusBar
        backgroundColor={barBackground}
        translucent
        barStyle={barStyle}
      />
      <KeyboardAvoidingView>
        {isNonScrolling(preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
      {loading && <Loader />}
    </Box>
  );
};

export default Screen;

const styles = StyleSheet.create({
  outerStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
