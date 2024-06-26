import React, {type ReactElement, useLayoutEffect, useState} from 'react';
import {
  Image,
  type ImageProps,
  type ImageURISource,
  Platform,
} from 'react-native';

export interface AutoImageProps extends ImageProps {
  /**
   * How wide should the image be?
   */
  maxWidth?: number;
  /**
   * How tall should the image be?
   */
  maxHeight?: number;
}

/**
 * A hook that will return the scaled dimensions of an image based on the
 * provided dimensions' aspect ratio. If no desired dimensions are provided,
 * it will return the original dimensions of the remote image.
 *
 * How is this different from `resizeMode: 'contain'`? Firstly, you can
 * specify only one side's size (not both). Secondly, the image will scale to fit
 * the desired dimensions instead of just being contained within its image-container.
 *
 */
function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth: number, maxHeight: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([
    0, 0,
  ]);
  const remoteAspectRatio = remoteWidth / remoteHeight;
  const [maxWidth, maxHeight] = dimensions ?? [0, 0];

  useLayoutEffect(() => {
    if (remoteUri.trim().length === 0) {
      return;
    }

    Image.getSize(remoteUri, (w, h) => {
      setRemoteImageDimensions([w, h]);
    });
  }, [remoteUri]);

  if (Number.isNaN(remoteAspectRatio)) {
    return [0, 0];
  }

  if (Boolean(maxWidth) && Boolean(maxHeight)) {
    const aspectRatio = Math.min(
      maxWidth / remoteWidth,
      maxHeight / remoteHeight,
    );
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio];
  } else if (!Number.isNaN(maxWidth)) {
    return [maxWidth, maxWidth / remoteAspectRatio];
  } else if (!Number.isNaN(maxHeight)) {
    return [maxHeight * remoteAspectRatio, maxHeight];
  } else {
    return [remoteWidth, remoteHeight];
  }
}

/**
 * An Image component that automatically sizes a remote or data-uri image.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md)
 */
export const AutoImage = (props: AutoImageProps): ReactElement => {
  const {maxWidth = 0, maxHeight = 0, onError, style, ...ImageProps} = props;
  const source = props.source as ImageURISource;

  const [width, height] = useAutoImage(
    // string url
    Platform.select({
      web: source?.uri! ?? (source as string),
      default: source?.uri!,
    }),
    // dimensions
    [maxWidth, maxHeight],
  );

  return (
    <Image {...ImageProps} style={[{width, height}, style]} onError={onError} />
  );
};
