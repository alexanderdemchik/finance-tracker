import { Outlet } from 'react-router-dom';
import { BottomNavBar } from '../BottomNavBar/BottomNavBar';
import { AddRecord } from '../overlays/AddRecord/AddRecord';
import { useAppStore } from '../../store/store';
import { SlideUpOverlay } from '../../layout/SlideUpOverlay/SlideUpOverlay';
import { InitialCurrencySelectOverlay } from '../overlays/InitialCurrencySelectOverlay/InitialCurrencySelectOverlay';

export const RouterLayout = () => {
  const isAddingRecord = useAppStore((state) => state.layout.isAddingRecord);
  const toggleAddingRecord = useAppStore((state) => state.layout.toggleAddingRecord);
  const defaultCurrency = useAppStore((state) => state.currency);

  return (
    <>
      <main>
        <Outlet />
      </main>
      <BottomNavBar />
      <SlideUpOverlay open={isAddingRecord} id="1" onClose={toggleAddingRecord}>
        <AddRecord />
      </SlideUpOverlay>
      {!defaultCurrency && <InitialCurrencySelectOverlay />}
    </>
  );
};
