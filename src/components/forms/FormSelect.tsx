import { Select, SelectProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormSelectProps extends SelectProps {
  name: string;
}

export function FormSelect({ name, ...props }: IFormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Select {...props} {...field} />}
    />
  );
}
