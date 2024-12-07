import { FaAngleLeft, FaCaretDown } from 'react-icons/fa6';
import { Box, Divider, Flex, Group, Menu, SegmentedControl, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useLocalStore } from '@/hooks/useLocalStore';
import { PageHeaderLayout } from '@/layout/PageHeaderLayout/PageHeaderLayout';
import { PageLayout } from '@/layout/PageLayout/PageLayout';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';
import { DateRangeEnum } from '@/enums/DateRangeEnum';
import { HorizontalSwipeContainer } from '@/layout/HorizontalSwipeContainer/HorizontalSwipeContainer';
import classes from './Charts.page.module.css';

export const ChartsPage = () => {
  const { t } = useTranslation();

  const { section, range, numberOfDisplayedDates, selectedDatesIndex, ...store } = useLocalStore({
    section: RecordTypeEnum.EXPENSES,
    range: DateRangeEnum.MONTH,
    numberOfDisplayedDates: 10,
    selectedDatesIndex: 0,
  });

  const sections = [
    { label: t('common.expenses'), value: RecordTypeEnum.EXPENSES },
    { label: t('common.income'), value: RecordTypeEnum.INCOME },
  ];

  const ranges = [
    { label: 'Год', value: DateRangeEnum.YEAR },
    { label: 'Месяц', value: DateRangeEnum.MONTH },
  ];

  const displayedDates = useMemo(() => {
    const currentDate = dayjs(new Date());
    const result = [];

    for (let i = 0; i < numberOfDisplayedDates; i++) {
      const date = currentDate.subtract(i, range === DateRangeEnum.MONTH ? 'month' : 'year');
      result.push(date);
    }

    return result;
  }, [range, numberOfDisplayedDates]);

  return (
    <>
      <PageLayout
        header={
          <PageHeaderLayout
            title={
              <Menu offset={-20}>
                <Menu.Target>
                  <Group gap="xxs" style={{ cursor: 'pointer' }}>
                    <span>{sections.find((el) => el.value === section)?.label}</span>
                    <FaCaretDown />
                  </Group>
                </Menu.Target>
                <Menu.Dropdown>
                  {sections.map((el) => (
                    <Menu.Item fw={500} onClick={() => store.setSection(el.value)}>
                      {el.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            }
          >
            <SegmentedControl
              data={ranges}
              value={range}
              styles={{ root: { borderRadius: 0 } }}
              size="xs"
              onChange={(val) => {
                store.set({ range: val as DateRangeEnum, numberOfDisplayedDates: 10, selectedDatesIndex: 0 });
              }}
            />
          </PageHeaderLayout>
        }
        isPage
      >
        <HorizontalSwipeContainer key={range}>
          {displayedDates.map((el, i) => (
            <Flex
              px="xs"
              py="xxs"
              className={clsx({ [classes['selected-range-item']]: selectedDatesIndex === i })}
              onTap={() => store.setSelectedDatesIndex(i)}
              component={motion.div}
              key={i}
            >
              <Text size="sm">{el.format(range === DateRangeEnum.YEAR ? 'YYYY' : 'MMM YYYY')}</Text>
            </Flex>
          ))}
          <Flex onTap={() => store.setNumberOfDisplayedDates(numberOfDisplayedDates + 5)} component={motion.div} align="center">
            <FaAngleLeft />
          </Flex>
        </HorizontalSwipeContainer>
        <Divider />
      </PageLayout>
    </>
  );
};
