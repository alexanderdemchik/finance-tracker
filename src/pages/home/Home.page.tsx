import { PageLayout } from '@/layout/PageLayout';
import { RecordsList } from './components/RecordsList/RecordsList';
import { Header } from './components/Header/Header';
import { useRecordsByMonth } from '@/hooks/useRecordsByMonth';
import { useCalculateIncomeExpenses } from '@/hooks/useCalculateIncomeExpenses';
import { createLocalStore } from '@/hooks/useLocalStore';

const useHomeStore = createLocalStore({ selectedDate: new Date() });

export function HomePage() {
  const { selectedDate, setSelectedDate } = useHomeStore();
  const records = useRecordsByMonth(selectedDate.getMonth());
  const { income, expenses } = useCalculateIncomeExpenses(records);

  return (
    <PageLayout
      header={<Header date={selectedDate} onDateChange={setSelectedDate} income={income} expenses={expenses} />}
      isPage
    >
      <RecordsList records={records} />
    </PageLayout>
  );
}
