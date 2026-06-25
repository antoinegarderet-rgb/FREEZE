import React from 'react';
import { Image, type ImageStyle, type StyleProp } from 'react-native';

interface FreezeLogoProps {
  height?: number;
  white?: boolean;
  style?: StyleProp<ImageStyle>;
}

const LOGO_ASPECT_RATIO = 2684 / 350;

export function FreezeLogo({ height = 24, white = false, style }: FreezeLogoProps): React.JSX.Element {
  const source = white
    ? require('../../../assets/logos/freeze-logo-white.png')
    : require('../../../assets/logos/freeze-logo.png');

  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[{ height, width: height * LOGO_ASPECT_RATIO }, style]}
    />
  );
}
