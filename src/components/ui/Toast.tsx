import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const TOAST_COLORS: Record<ToastType, { bg: string; text: string }> = {
  success: { bg: colors.greenD, text: colors.white },
  error: { bg: colors.red, text: colors.white },
  info: { bg: colors.navy, text: colors.white },
};

export function Toast({ type, message }: ToastProps): React.JSX.Element {
  const palette = TOAST_COLORS[type];
  return (
    <View style={[styles.container, { backgroundColor: palette.bg }]}>
      <Text style={[styles.message, { color: palette.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
