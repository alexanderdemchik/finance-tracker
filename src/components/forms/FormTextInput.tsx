import { TextInput, TextInputProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

interface IFormTextInputProps extends Omit<TextInputProps, 'required'> {
  name: string;
  required?: string;
}

export function FormTextInput({ name, required, ...props }: IFormTextInputProps) {
  const { register } = useFormContext();

  return <TextInput {...props} required={!!required} {...register(name, { required })} />;
}
