import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'locked';
export type ButtonSize = 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
}: ButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;
  const sizeStyle = size === 'lg' ? styles.sizeLg : styles.sizeMd;

  const content = loading ? (
    <ActivityIndicator color={variant === 'primary' ? colors.white : colors.navy} />
  ) : (
    <Text
      style={[
        styles.label,
        variant === 'primary' && styles.labelPrimary,
        variant === 'secondary' && styles.labelSecondary,
        variant === 'ghost' && styles.labelGhost,
        variant === 'locked' && styles.labelLocked,
      ]}
    >
      {label}
    </Text>
  );

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={isDisabled ? [colors.s3, colors.s3] : [colors.navy, colors.blue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, sizeStyle]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        sizeStyle,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'locked' && styles.locked,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  sizeLg: {
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  secondary: {
    backgroundColor: colors.s1,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  locked: {
    backgroundColor: colors.s3,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  labelPrimary: {
    color: colors.white,
  },
  labelSecondary: {
    color: colors.navy,
  },
  labelGhost: {
    color: colors.blue,
  },
  labelLocked: {
    color: colors.t3,
  },
});
