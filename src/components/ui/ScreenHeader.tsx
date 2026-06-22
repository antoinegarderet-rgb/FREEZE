import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({ title, onBack, rightAction }: ScreenHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightAction ?? <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.s1,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: colors.text,
  },
  spacer: {
    width: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
});
