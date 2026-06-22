import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps): React.JSX.Element {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!checked)}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.check}>✓</Text>}
      </View>
      <View style={styles.labelContainer}>
        {typeof label === 'string' ? <Text style={styles.labelText}>{label}</Text> : label}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    marginTop: 1,
    backgroundColor: colors.s1,
    borderWidth: 1.5,
    borderColor: colors.borderM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  check: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  labelContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 13,
    color: colors.t2,
    lineHeight: 19,
  },
});
