import { Flex, Group, MantineSize, Stack, Title, TitleOrder } from '@mantine/core';
import { ReactNode } from 'react';
import clsx from 'clsx';
import classes from './PageHeaderLayout.module.css';

interface IDefaultHeaderLayout {
  title: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  border?: boolean;
  size?: MantineSize;
}

export function PageHeaderLayout({
  title,
  left = <svg height="1em" width="1em" />,
  right = <svg height="1em" width="1em" />,
  children,
  border = true,
  size = 'lg',
}: IDefaultHeaderLayout) {
  const sizeMap: Record<string, TitleOrder> = { sm: 6, md: 5, lg: 4 };

  return (
    <Stack gap={0} className={clsx(classes.wrapper, { [classes.border]: border })}>
      <Group p="xs" justify="space-between">
        <Flex fz="lg">{left}</Flex>
        <Title order={sizeMap[size]} fw={500}>
          {title}
        </Title>
        <Flex fz="lg">{right}</Flex>
      </Group>
      {children}
    </Stack>
  );
}
