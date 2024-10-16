import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button, Flex, Group, SegmentedControl, SimpleGrid, Stack } from '@mantine/core';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { DefaultHeaderLayout } from '../../layout/DefaultHeaderLayout';
import { PageLayout } from '../../layout/PageLayout';
import { BackButton } from '../../components/BackButton/BackButton';
import { ICategory, RecordTypeEnum } from '../../store/types';
import { FormTextInput } from '../../components/forms/FormTextInput';
import { AvailableIconsType, iconsToComponentsMap } from '../../constants/iconsToComponentsMap';
import classes from './AddCategory.module.css';
import { useCategories } from '../../hooks/useCategories';

export function AddCategory() {
  const icons = Object.keys(iconsToComponentsMap);
  const form = useForm<ICategory>({
    defaultValues: {
      title: '',
      icon: icons[0] as AvailableIconsType,
      type: RecordTypeEnum.EXPENSES,
    } as ICategory,
  });

  const selectedIcon = form.watch('icon');
  const SelectedIcon = iconsToComponentsMap[selectedIcon!];

  const { addCategory } = useCategories();
  const navigate = useNavigate();

  return (
    <PageLayout
      header={
        <DefaultHeaderLayout title="Добавить категорию" left={<BackButton />}>
          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <SegmentedControl
                value={field.value}
                onChange={(val) => field.onChange(val)}
                style={{ borderRadius: 0 }}
                data={[
                  { label: 'Расходы', value: RecordTypeEnum.EXPENSES },
                  { label: 'Доходы', value: RecordTypeEnum.INCOME },
                ]}
              />
            )}
          />
        </DefaultHeaderLayout>
      }
    >
      <FormProvider {...form}>
        <Stack p="md" className="grow">
          <Group gap="xs" align="center" justify="center">
            <FormTextInput
              error={form.formState.errors.title?.message}
              name="title"
              required="Поле обязательно"
              placeholder="Введите название"
              style={{ flexGrow: 1 }}
            />
            <Flex className={clsx(classes['icon-wrapper'], classes.selected)}>
              <SelectedIcon />
            </Flex>
          </Group>
          <Controller
            name="icon"
            render={({ field }) => (
              <SimpleGrid cols={5}>
                {icons.map((icon) => {
                  const Icon = iconsToComponentsMap[icon as AvailableIconsType];
                  return (
                    <div
                      className={clsx(classes['icon-wrapper'], {
                        [classes.selected]: field.value === icon,
                      })}
                      onClick={() => field.onChange(icon)}
                    >
                      <Icon size={20} />
                    </div>
                  );
                })}
              </SimpleGrid>
            )}
          />
        </Stack>
        <Button
          className="br-0"
          onClick={form.handleSubmit((data) => {
            addCategory({ ...data, id: v4() });
            navigate(-1);
          })}
        >
          Сохранить
        </Button>
      </FormProvider>
    </PageLayout>
  );
}
