import { Button, Flex, Group, Stack, Text } from '@mantine/core';
import { Reorder, useDragControls } from 'framer-motion';
import { IoReorderTwo } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { memo, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useToggle } from '@mantine/hooks';
import classes from './AccountsSettings.module.css';
import { useAccounts } from '@/hooks/useAccounts';
import { ColoredIcon } from '@/components/ColoredIcon/ColoredIcon';
import { IAccount } from '@/types/IAccount';
import { getAccountTitle } from '@/helpers/account';
import { PageLayout } from '@/layout/PageLayout/PageLayout';
import { PageHeaderLayout } from '@/layout/PageHeaderLayout/PageHeaderLayout';
import { BackButton } from '@/components/BackButton/BackButton';
import { SlideUpOverlay } from '@/layout/SlideUpOverlay/SlideUpOverlay';
import { AddAccount } from '../AddAccount/AddAccount';

export const AccountsSettings = () => {
  const [isAddAccountOpen, toggleIsAddAccountOpen] = useToggle();
  const { displayedAccounts, hiddenAccounts, setAccounts, editAccount } = useAccounts();

  const setMergedAccounts = useCallback(
    (displayed: IAccount[]) => {
      setAccounts([...displayed, ...hiddenAccounts]);
    },
    [displayedAccounts, hiddenAccounts]
  );

  const toggleAccountVisibility = useCallback((id: string, hidden: boolean) => editAccount({ id, hidden }), []);

  return (
    <PageLayout header={<PageHeaderLayout left={<BackButton />} title="Счета" />}>
      <Stack gap={0} className={classes['list-wrapper']}>
        <Reorder.Group axis="y" onReorder={setMergedAccounts} values={displayedAccounts} layoutScroll>
          {displayedAccounts.map((el) => (
            <AccountListItem item={el} key={el.id} toggleVisibility={toggleAccountVisibility} />
          ))}
        </Reorder.Group>
        <ul>
          {hiddenAccounts.map((el) => (
            <AccountListItem item={el} key={el.id} toggleVisibility={toggleAccountVisibility} />
          ))}
        </ul>
      </Stack>

      <Flex className={classes['add-btn']}>
        <Button fullWidth size="md" onClick={() => toggleIsAddAccountOpen()}>
          Добавить счёт
        </Button>
      </Flex>

      <SlideUpOverlay open={isAddAccountOpen} onClose={() => toggleIsAddAccountOpen()} id="add-account">
        <AddAccount />
      </SlideUpOverlay>
    </PageLayout>
  );
};

const AccountListItem = memo(({ item, toggleVisibility }: { item: IAccount; toggleVisibility: (id: string, hidden: boolean) => void }) => {
  const [ref, setRef] = useState<HTMLDivElement>();
  const { t } = useTranslation();

  useEffect(() => {
    const f = (e: PointerEvent) => {
      dragControls.start(e);
      e.preventDefault();
      e.stopPropagation();
    };

    ref?.addEventListener('pointerdown', f);

    return () => {
      ref?.removeEventListener('pointerdown', f);
    };
  }, [ref]);

  const dragControls = useDragControls();

  const content = (
    <Group gap="xs">
      <Flex className={clsx(classes['hide-btn'], { [classes.hidden]: item.hidden })} onClick={() => toggleVisibility(item.id, !item.hidden)}>
        {item.hidden ? <FaPlus /> : <FaMinus />}
      </Flex>
      <ColoredIcon icon={item.icon} color={item.color} />
      <Text size="sm" style={{ userSelect: 'none' }}>
        {getAccountTitle(item.title, t)}
      </Text>
    </Group>
  );

  if (item.hidden) {
    return <li>{content}</li>;
  }

  return (
    <Reorder.Item key={item.id} value={item} id={item.id} dragControls={dragControls} dragListener={false}>
      {content}
      <Flex ref={(r) => setRef(r!)} style={{ cursor: 'grab', touchAction: 'none' }}>
        <IoReorderTwo />
      </Flex>
    </Reorder.Item>
  );
});
