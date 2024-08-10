import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaCaretDown, FaFilter } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MonthPicker } from '@mantine/dates';
import classes from './Header.module.css';
import { useDefaultCurrency } from '../../../hooks/useDefaultCurrency';
import { signByCurrencyCode } from '../../../constants/currencies';

interface IHeaderProps {
  date: Date;
  onDateChange: (d: Date) => void;
  income: number;
  expenses: number;
}

export function Header({ date, income, expenses, onDateChange }: IHeaderProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());
  const defaultCurrency = useDefaultCurrency();

  const sign = signByCurrencyCode[defaultCurrency];

  useEffect(() => {
    opened && setCalendarDate(new Date());
  }, [opened]);

  return (
    <>
      <Group justify="space-between" p="xs">
        <FaFilter />
        <Title order={5}>Финансы</Title>
        <FaCalendarAlt />
      </Group>

      <Group px="xs" pb="xxs" justify="space-between">
        <Stack gap={0} onClick={open}>
          <Text size="xs" c="dimmed">
            {dayjs(date).format('YYYY')}
          </Text>
          <Text tt="capitalize" fw={500} lh="xs" className={classes.month}>
            {dayjs(date).format('MMMM')} <FaCaretDown />
          </Text>
        </Stack>

        <Group gap="lg">
          <Stack gap={0}>
            <Text size="xs" c="dimmed">
              Расходы
            </Text>
            <Text tt="capitalize" fw={500}>
              {sign} {expenses}
            </Text>
          </Stack>
          <Stack gap={0}>
            <Text size="xs" c="dimmed">
              Доходы
            </Text>
            <Text tt="capitalize" fw={500}>
              {sign} {income}
            </Text>
          </Stack>
        </Group>
      </Group>

      <Modal opened={opened} onClose={close} withCloseButton={false} centered size="auto">
        <MonthPicker value={calendarDate} onChange={setCalendarDate} />
        <Group justify="center">
          <Button variant="subtle" onClick={close}>
            Отмена
          </Button>
          <Button
            variant="subtle"
            onClick={() => {
              onDateChange(calendarDate || new Date());
              close();
            }}
          >
            Принять
          </Button>
        </Group>
      </Modal>
    </>
  );
}
