import { ReactNode } from 'react';
import { Grid, Stack, Text } from '@mantine/core';
import { TbAdjustmentsHorizontal, TbChartPie, TbClipboardText, TbReport } from 'react-icons/tb';
import { FaCirclePlus } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import classes from './BottomNavBar.module.css';
import { useAppStore } from '../../store/store';
import { RoutesPathsEnum } from '../../constants/routes';

const NavBarItem = ({
  icon,
  title,
  active,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <Stack
    gap="2px"
    align="center"
    justify="center"
    className={clsx(classes['nav-item'], { [classes.active]: active })}
    onClick={onClick}
  >
    {icon}
    <Text variant="text" size="xs">
      {title}
    </Text>
  </Stack>
);

export function BottomNavBar() {
  const { t } = useTranslation(undefined, { keyPrefix: 'bottom-navigation' });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toggleAddingRecord } = useAppStore((state) => state.layout);

  return (
    <footer className={classes.wrapper}>
      <Grid align="center" justify="center" className={classes['actions-wrapper']}>
        <Grid.Col span={6}>
          <NavBarItem
            icon={<TbClipboardText />}
            title={t('records')}
            active={pathname === RoutesPathsEnum.HOME}
            onClick={() => navigate(RoutesPathsEnum.HOME)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NavBarItem
            icon={<TbChartPie />}
            title={t('charts')}
            active={pathname === RoutesPathsEnum.CHARTS}
            onClick={() => navigate(RoutesPathsEnum.CHARTS)}
          />
        </Grid.Col>
      </Grid>
      <button className={classes['add-btn-wrapper']} onClick={() => toggleAddingRecord()} type="button">
        <FaCirclePlus />
        <div className={classes['add-btn-background-1']} />
        <div className={classes['add-btn-background-2']} />
      </button>
      <Grid align="center" justify="center" className={classes['actions-wrapper']}>
        <Grid.Col span={6}>
          <NavBarItem
            icon={<TbReport />}
            title={t('accounts')}
            active={pathname === RoutesPathsEnum.ACCOUNTS}
            onClick={() => navigate(RoutesPathsEnum.ACCOUNTS)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NavBarItem
            icon={<TbAdjustmentsHorizontal />}
            title={t('settings')}
            active={pathname === RoutesPathsEnum.SETTINGS}
            onClick={() => navigate(RoutesPathsEnum.SETTINGS)}
          />
        </Grid.Col>
      </Grid>
    </footer>
  );
}
