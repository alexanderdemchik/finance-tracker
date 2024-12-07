import { useMemo } from 'react';
import { PageLayout } from '@/layout/PageLayout/PageLayout';
import { RecordsList } from '../../components/RecordsList/RecordsList';
import { Header } from './components/Header/Header';
import { useCalculateIncomeExpenses } from '@/hooks/useCalculateIncomeExpenses';
import { createLocalStore } from '@/hooks/useLocalStore';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';
import { useRecordsByRange } from '@/hooks/useRecordsByRange';
import { DateRangeEnum } from '@/enums/DateRangeEnum';

const useHomeStore = createLocalStore({ selectedDate: new Date() });

export function HomePage() {
  const { selectedDate, setSelectedDate } = useHomeStore();
  const records = useRecordsByRange(selectedDate, DateRangeEnum.MONTH);
  const { income, expenses } = useCalculateIncomeExpenses(records);

  const filteredRecords = useMemo(() => records.filter((el) => el.type !== RecordTypeEnum.CORRECTION), [records]);

  return (
    <PageLayout header={<Header date={selectedDate} onDateChange={setSelectedDate} income={income} expenses={expenses} />} isPage>
      <RecordsList records={filteredRecords} />
    </PageLayout>
  );
}
