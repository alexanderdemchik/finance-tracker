import { Stack } from '@mantine/core';
import { ReactNode } from 'react';
import classes from './PageLayout.module.css';

interface IPageLayoutProps {
  children: ReactNode;
  header: ReactNode;
  isPage?: boolean;
}

export function PageLayout({ children, header, isPage }: IPageLayoutProps) {
  return (
    <Stack gap={0} className={classes.wrapper}>
      <Stack gap={0} className={classes.header}>
        {header}
      </Stack>
      <Stack gap={0} className={classes.body} mb={isPage ? 'var(--bottom-nav-bar-height)' : 0}>
        {children}
      </Stack>
    </Stack>
  );
}
