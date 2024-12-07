import { Button, InputLabel, SimpleGrid, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../layout/PageLayout/PageLayout';
import { currencies } from '../../constants/currencies';
import { PageHeaderLayout } from '../../layout/PageHeaderLayout/PageHeaderLayout';
import { BackButton } from '../../components/BackButton/BackButton';
import { FormTextInput } from '../../components/forms/FormTextInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { FormNumberInput } from '../../components/forms/FormNumberInput';
import { useDefaultCurrency } from '../../hooks/useDefaultCurrency';
import { AvailableIconsType } from '../../constants/iconsToComponentsMap';
import classes from './AddAccount.module.css';
import { useAccounts } from '../../hooks/useAccounts';
import { IAccount } from '@/types/IAccount';
import { ColoredIcon } from '@/components/ColoredIcon/ColoredIcon';

const accountIcons: AvailableIconsType[] = ['moneyStack', 'wallet', 'piggyBank', 'bank'];

export function AddAccount() {
  const navigate = useNavigate();
  const defaultCurrency = useDefaultCurrency();
  const { t: tCurrency } = useTranslation(undefined, { keyPrefix: 'currencies' });
  const form = useForm<Partial<IAccount>>({
    defaultValues: {
      title: '',
      currency: defaultCurrency,
      balance: 0,
      icon: 'moneyStack',
    },
  });
  const { createAccount } = useAccounts();

  const sortedCurrencies = currencies.map((el) => ({
    value: el.code,
    label: `${tCurrency(el.code)}(${el.sign}) - ${el.code}`,
  }));

  const handleSubmit = form.handleSubmit((data) => {
    createAccount({ ...data, id: v4() } as IAccount);
    navigate(-1);
  });

  return (
    <PageLayout header={<PageHeaderLayout title="Добавить счет" left={<BackButton />} />}>
      <FormProvider {...form}>
        <Stack p="xs" gap="xs">
          <FormTextInput
            label="Название"
            placeholder="Введите название"
            name="title"
            required="Обязательное поле"
            error={form.formState.errors.title?.message}
          />
          <FormSelect name="currency" data={sortedCurrencies} searchable comboboxProps={{ withinPortal: false }} label="Валюта" />
          <FormNumberInput label="Баланс" name="balance" />

          <Controller
            name="icon"
            control={form.control}
            render={({ field }) => (
              <Stack gap={0}>
                <InputLabel>Иконка</InputLabel>
                <SimpleGrid cols={5} p="xs" className={classes['icons-wrapper']}>
                  {accountIcons.map((el) => (
                    <ColoredIcon icon={el} selected={field.value === el} onClick={() => field.onChange(el)} />
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          />
        </Stack>
        <Button className={classes['submit-btn']} onClick={handleSubmit} size="md">
          Сохранить
        </Button>
      </FormProvider>
    </PageLayout>
  );
}
