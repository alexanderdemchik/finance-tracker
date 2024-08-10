import { AspectRatio, Button, Flex, Grid, InputLabel, SimpleGrid, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../../layout/PageLayout';
import { currencies } from '../../../constants/currencies';
import { DefaultHeaderLayout } from '../../../layout/DefaultHeaderLayout';
import { BackButton } from '../../BackButton/BackButton';
import { FormTextInput } from '../../forms/FormTextInput';
import { FormSelect } from '../../forms/FormSelect';
import { FormNumberInput } from '../../forms/FormNumberInput';
import { useDefaultCurrency } from '../../../hooks/useDefaultCurrency';
import { IAccount } from '../../../store/types';
import { AvailableIconsType, iconsToComponentsMap } from '../../../constants/iconsToComponentsMap';
import classes from './AddAccount.module.css';
import { useAccounts } from '../../../hooks/useAccounts';

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
    <PageLayout header={<DefaultHeaderLayout title="Добавить счет" left={<BackButton />} />}>
      <FormProvider {...form}>
        <Stack p="xs" gap="xs">
          <FormTextInput
            label="Название"
            placeholder="Введите название"
            name="title"
            required="Обязательное поле"
            error={form.formState.errors.title?.message}
          />
          <FormSelect
            name="currency"
            data={sortedCurrencies}
            searchable
            comboboxProps={{ withinPortal: false }}
            label="Валюта"
          />
          <FormNumberInput label="Баланс" name="balance" />

          <Controller
            name="icon"
            control={form.control}
            render={({ field }) => (
              <Stack gap={0}>
                <InputLabel>Иконка</InputLabel>
                <SimpleGrid cols={5} p="xs" className={classes['icons-wrapper']}>
                  {accountIcons.map((el) => {
                    const Icon = iconsToComponentsMap[el];
                    return (
                      <AspectRatio>
                        <Flex
                          className={clsx(classes['icon-wrapper'], {
                            [classes.selected]: field.value === el,
                          })}
                          onClick={() => field.onChange(el)}
                        >
                          <Icon />
                        </Flex>
                      </AspectRatio>
                    );
                  })}
                </SimpleGrid>
              </Stack>
            )}
          />
        </Stack>
        <Button className={classes['submit-btn']} onClick={handleSubmit}>
          Сохранить
        </Button>
      </FormProvider>
    </PageLayout>
  );
}
