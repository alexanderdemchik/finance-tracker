import { Group, Stack, Title } from '@mantine/core';
import { ReactNode } from 'react';
import classes from './DefaultHeaderLayout.module.css';

interface IDefaultHeaderLayout {
  title: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}

export function DefaultHeaderLayout({ title, left, right, children }: IDefaultHeaderLayout) {
  return (
    <Stack gap={0} className={classes.wrapper}>
      <Group p="xs" justify="space-between">
        <div>{left}</div>
        <Title order={5} fw={500}>
          {title}
        </Title>
        <div>{right}</div>
      </Group>
      {children}
    </Stack>
  );
}
