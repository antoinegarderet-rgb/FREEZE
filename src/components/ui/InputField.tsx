import React from 'react';
import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  icon,
  suffix,
  keyboardType,
  autoCapitalize = 'none',
}: InputFieldProps): React.JSX.Element {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.field, error && styles.fieldError]}>
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.t3}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={styles.input}
        />
        {suffix}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.t2,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.s1,
    borderRadius: radii.xl,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  fieldError: {
    borderColor: colors.red,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  error: {
    fontSize: 11,
    color: colors.red,
    marginTop: 5,
  },
});
