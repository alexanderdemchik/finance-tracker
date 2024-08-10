import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Router } from './Router';
import { resolver, theme } from './theme';
import './i18n';
import './global.css';
import { useAppStore } from './store/store';
import '@mantine/dates/styles.css';

dayjs.locale('ru');

export default function App() {
  const isHydrated = useAppStore((state) => state._hasHydrated);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" cssVariablesResolver={resolver}>
      <DatesProvider settings={{ locale: 'ru' }}>{isHydrated && <Router />}</DatesProvider>
    </MantineProvider>
  );
}
