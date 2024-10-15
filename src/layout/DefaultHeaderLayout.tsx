import { Group, Stack, Title } from '@mantine/core';
import { ReactNode } from 'react';
import clsx from 'clsx';
import classes from './DefaultHeaderLayout.module.css';

interface IDefaultHeaderLayout {
  title: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  border?: boolean;
}

export function DefaultHeaderLayout({
  title,
  left = <svg />,
  right = <svg />,
  children,
  border = true,
}: IDefaultHeaderLayout) {
  return (
    <Stack gap={0} className={clsx(classes.wrapper, { [classes.border]: border })}>
      <Group p="xs" justify="space-between">
        <div>{left}</div>
        <Title order={4} fw={500}>
          {title}
        </Title>
        <div>{right}</div>
      </Group>
      {children}
    </Stack>
  );
}
