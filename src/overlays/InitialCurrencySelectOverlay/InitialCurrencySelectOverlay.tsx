import { Button, Flex, Paper, Select, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { BsCashCoin } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import classes from './InitialCurrencySelectOverlay.module.css';
import { CurrencyCodeEnum } from "@/enums/CurrencyCodeEnum";
import { useAppStore } from '../../store/store';
import { getSortedCurrencies } from '@/helpers/currency';

export const InitialCurrencySelectOverlay = () => {
  const { t: tCurrency } = useTranslation(undefined, { keyPrefix: 'currencies' });
  const { t } = useTranslation(undefined, { keyPrefix: 'initial-currency-selection' });
  const setInitialCurrency = useAppStore((state) => state.setInitialCurrency);

  const sortedCurrencies = getSortedCurrencies(tCurrency);

  const [currency, setCurrency] = useState<CurrencyCodeEnum | null>(null);

  const comboboxData = sortedCurrencies.map((el) => ({
    value: el.code,
    label: `${el.label}(${el.sign}) - ${el.code}`,
  }));

  useEffect(() => {
    // predict user country
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const code = { 'Europe/Minsk': CurrencyCodeEnum.BYN }[tz];

    if (code) setCurrency(code);
  }, []);

  return (
    <Paper className={classes.wrapper}>
      <Stack justify="center">
        <Flex className={classes.image}>
          <BsCashCoin />
        </Flex>
        <Text size="md" fw={500}>
          {t('select-currency')}
        </Text>
        <Select
          data={comboboxData}
          searchable
          placeholder={t('placeholder')}
          value={currency}
          onChange={(val) => setCurrency(val as CurrencyCodeEnum)}
          comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false } }}
        />

        <Text size="xs" c="dimmed">
          {t('description')}
        </Text>
      </Stack>

      {currency && (
        <div className={classes['confirm-wrapper']}>
          <Button
            radius={0}
            className={classes.confirm}
            size="md"
            onClick={() => setInitialCurrency(currency)}
          >
            {t('confirm')}
          </Button>
        </div>
      )}
    </Paper>
  );
};
