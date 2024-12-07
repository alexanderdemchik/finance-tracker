import { Button, Group } from '@mantine/core';
import { PageLayout } from '../../layout/PageLayout/PageLayout';
import { AccountsList } from '../../components/AccountsList/AccountsList';
import { PageHeaderLayout } from '../../layout/PageHeaderLayout/PageHeaderLayout';
import { SlideUpOverlay } from '@/layout/SlideUpOverlay/SlideUpOverlay';
import { AddAccount } from '@/overlays/AddAccount/AddAccount';
import { useLocalStore } from '@/hooks/useLocalStore';
import { AccountsSettings } from '@/overlays/AccountsSettings/AccountsSettings';
import { AccountDetails } from '@/overlays/AccountDetails/AccountDetails';

export function AccountsPage() {
  const { isAddAccountOpen, isAccountSettingsOpen, isAccountsDetailsOpenId, setIsAccountsDetailsOpenId, toggleIsAccountSettingsOpen, toggleIsAddAccountOpen } =
    useLocalStore({
      isAddAccountOpen: false,
      isAccountSettingsOpen: false,
      isAccountsDetailsOpenId: '',
    });

  return (
    <PageLayout header={<PageHeaderLayout title="Счета" />} isPage>
      <AccountsList onItemClick={(id) => setIsAccountsDetailsOpenId(id)} />
      <Group m="md" className="center nowrap" gap="xs">
        <Button variant="outline" onClick={() => toggleIsAddAccountOpen()} fullWidth>
          Добавить счёт
        </Button>
        <Button variant="outline" fullWidth onClick={() => toggleIsAccountSettingsOpen()}>
          Управление счетами
        </Button>
      </Group>

      <SlideUpOverlay open={!!isAccountsDetailsOpenId} onClose={() => setIsAccountsDetailsOpenId()} id="account-details">
        <AccountDetails id={isAccountsDetailsOpenId} />
      </SlideUpOverlay>
      <SlideUpOverlay open={isAddAccountOpen} onClose={() => toggleIsAddAccountOpen()} id="add-account">
        <AddAccount />
      </SlideUpOverlay>
      <SlideUpOverlay open={isAccountSettingsOpen} onClose={() => toggleIsAccountSettingsOpen()} id="account-settings">
        <AccountsSettings />
      </SlideUpOverlay>
    </PageLayout>
  );
}
