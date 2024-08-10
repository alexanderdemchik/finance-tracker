import { PageLayout } from '../layout/PageLayout';
import { RecordsList } from '../components/HomePage/RecordsList/RecordsList';
import { Header } from '../components/HomePage/Header/Header';
import { useHomeStore } from '../store/pages/home';
import { useRecordsByMonth } from '../hooks/useRecordsByMonth';
import { useCalculateIncomeExpenses } from '../hooks/useCalculateIncomeExpenses';

export function HomePage() {
  const { selectedDate, setSelectedDate } = useHomeStore();
  const records = useRecordsByMonth(selectedDate.getMonth());
  const { income, expenses } = useCalculateIncomeExpenses(records);

  return (
    <PageLayout
      header={
        <Header
          date={selectedDate}
          onDateChange={setSelectedDate}
          income={income}
          expenses={expenses}
        />
      }
      isPage
    >
      <RecordsList records={records} />
    </PageLayout>
  );
}
