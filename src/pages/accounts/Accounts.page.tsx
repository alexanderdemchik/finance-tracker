import { PageLayout } from '../../layout/PageLayout';
import { AccountsList } from './components/AccountsList/AccountsList';
import { DefaultHeaderLayout } from '../../layout/DefaultHeaderLayout';

export function AccountsPage() {
  return (
    <PageLayout header={<DefaultHeaderLayout title="Счета" />} isPage>
      <AccountsList />
    </PageLayout>
  );
}
