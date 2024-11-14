import { Flex, Group, Stack, Title, TitleOrder } from '@mantine/core';
import { ReactNode } from 'react';
import clsx from 'clsx';
import classes from './DefaultHeaderLayout.module.css';

interface IDefaultHeaderLayout {
  title: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  border?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function DefaultHeaderLayout({
  title,
  left = <svg />,
  right = <svg />,
  children,
  border = true,
  size = 'lg',
}: IDefaultHeaderLayout) {
  const sizeMap: Record<string, TitleOrder> = { sm: 6, md: 5, lg: 4 };

  return (
    <Stack gap={0} className={clsx(classes.wrapper, { [classes.border]: border })}>
      <Group p="xs" justify="space-between">
        <Flex>{left}</Flex>
        <Title order={sizeMap[size]} fw={500}>
          {title}
        </Title>
        <Flex>{right}</Flex>
      </Group>
      {children}
    </Stack>
  );
}
