import { useTranslation } from 'react-i18next';
import { NavLink, Radio, Stack } from '@mantine/core';
import { getSortedCurrencies } from '@/helpers/currency';
import { CurrencyCodeEnum } from '@/constants/currencies';
import classes from './CurencySelect.module.css';

interface CurrencySelectProps {
  selected?: CurrencyCodeEnum | null;
  onChange: (code: CurrencyCodeEnum) => void;
}

export const CurrencySelect = ({ selected, onChange }: CurrencySelectProps) => {
  const { t: tCurrency } = useTranslation(undefined, { keyPrefix: 'currencies' });
  const sortedCurrencies = getSortedCurrencies(tCurrency);

  return (
    <Stack gap={0} className={classes.wrapper}>
      {sortedCurrencies.map((el) => (
        <NavLink
          key={el.code}
          label={`${el.code} (${el.sign})`}
          description={el.label}
          component="div"
          rightSection={<Radio checked={selected === el.code} readOnly />}
          onClick={() => onChange(el.code)}
        />
      ))}
    </Stack>
  );
};
