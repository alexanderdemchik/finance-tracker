import { NumberInput, NumberInputProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormNumberInputProps extends NumberInputProps {
  name: string;
}

export function FormNumberInput({ name, ...props }: IFormNumberInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <NumberInput {...props} {...field} />}
    />
  );
}
