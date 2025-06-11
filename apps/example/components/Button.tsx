import { ButtonProps, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/common';

export const Button = (props: ButtonProps) => {
  const { title } = props;
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        props.disabled && styles.buttonDisabled,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    backgroundColor: colors.buttonBackgroundHover,
  },
  text: {
    color: colors.default,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
