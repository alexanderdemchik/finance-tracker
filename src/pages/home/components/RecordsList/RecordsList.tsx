import { Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { IoNewspaper } from 'react-icons/io5';
import classes from './RecordsList.module.css';
import { IRecord } from '../../../../store/types';
import { RecordItem } from './RecordItem';
import { useCategories } from '../../../../hooks/useCategories';
import { calculateRecordsIncomeExpenses } from '../../../../helpers/calculateRecordsIncomeExpenses';
import { useDefaultCurrency } from '../../../../hooks/useDefaultCurrency';
import { useCurrencyConverter } from '../../../../hooks/useCurrencyConverter';

const DATE_FORMAT_TEMPLATE = 'DD.MM.YYYY';

interface IRecordsProps {
  records: IRecord[];
}

export const RecordsList = ({ records }: IRecordsProps) => {
  const { byId: categoriesById } = useCategories();
  const defaultCurrency = useDefaultCurrency();
  const { convert } = useCurrencyConverter();

  const recordsByDays = useMemo(() => {
    const sortedRecords = records.sort((a, b) => a.date - b.date);

    return sortedRecords.reduce(
      (acc, curr) => {
        const formattedTime = dayjs(curr.date).format(DATE_FORMAT_TEMPLATE);

        const lastElem = acc.at(-1);

        if (lastElem?.date === formattedTime) {
          lastElem.records.push(curr);
        } else {
          return [...acc, { date: formattedTime, records: [curr] }];
        }

        return acc;
      },
      [] as {
        date: string;
        records: IRecord[];
      }[]
    );
  }, [records]);

  const getIncomeExpensesTitle = (recs: IRecord[]) => {
    const { expenses, income } = calculateRecordsIncomeExpenses(recs, defaultCurrency, convert);

    let title = '';

    if (expenses > 0) {
      title += `Расходы: ${expenses}  `;
    }

    if (income > 0) {
      title += `Доходы: ${income}`;
    }

    return title.trim();
  };

  return (
    <Stack className={classes.wrapper} gap={0}>
      {!recordsByDays.length && (
        <Flex className={classes.noItems}>
          <Text size="sm" c="dimmed">
            <IoNewspaper />
          </Text>
          <Text size="sm" c="dimmed">
            Нет записей
          </Text>
        </Flex>
      )}
      {recordsByDays.map((el) => (
        <div key={el.date}>
          <Group justify="space-between" pl="xs" pr="xs" pb={2} pt={2}>
            <Text size="xs" c="dimmed">
              {el.date}
            </Text>
            <Text size="xs" c="dimmed" style={{ whiteSpace: 'pre' }}>
              {getIncomeExpensesTitle(el.records)}
            </Text>
          </Group>
          <Divider />
          {el.records.map((rec) => (
            <div key={rec.id}>
              <RecordItem record={rec} category={categoriesById[rec.catId]} />
              <Divider />
            </div>
          ))}
        </div>
      ))}
    </Stack>
  );
};
