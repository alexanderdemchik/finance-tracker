import { Button, Flex, Paper, Select, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { BsCashCoin } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import classes from './InitialCurrencySelectOverlay.module.css';
import { currencies, CurrencyCodeEnum } from '../../../constants/currencies';
import { useAppStore } from '../../../store/store';

export const InitialCurrencySelectOverlay = () => {
  const { t: tCurrency } = useTranslation(undefined, { keyPrefix: 'currencies' });
  const { t } = useTranslation(undefined, { keyPrefix: 'initial-currency-selection' });
  const setInitialCurrency = useAppStore((state) => state.setInitialCurrency);

  const sortedCurrencies = currencies.map((el) => ({
    value: el.code,
    label: `${tCurrency(el.code)}(${el.sign}) - ${el.code}`,
  }));

  const [currency, setCurrency] = useState<CurrencyCodeEnum | null>(null);

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
          data={sortedCurrencies}
          searchable
          placeholder={t('placeholder')}
          value={currency}
          onChange={(val) => setCurrency(val as CurrencyCodeEnum)}
        />

        <Text size="xs" c="dimmed">
          {t('description')}
        </Text>
      </Stack>

      {currency && (
        <Button
          radius={0}
          className={classes.confirm}
          size="md"
          onClick={() => setInitialCurrency(currency)}
        >
          {t('confirm')}
        </Button>
      )}
    </Paper>
  );
};
