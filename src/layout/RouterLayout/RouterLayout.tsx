import { Outlet } from 'react-router-dom';
import { BottomNavBar } from '../../components/BottomNavBar/BottomNavBar';
import { AddEditRecord } from '../../overlays/AddEditRecord/AddEditRecord';
import { useAppStore } from '../../store/store';
import { SlideUpOverlay } from '../SlideUpOverlay/SlideUpOverlay';
import { InitialCurrencySelectOverlay } from '../../overlays/InitialCurrencySelectOverlay/InitialCurrencySelectOverlay';

export const RouterLayout = () => {
  const isAddingRecord = useAppStore((state) => state.layout.isAddingRecord);
  const toggleAddingRecord = useAppStore((state) => state.layout.toggleAddingRecord);
  const editData = useAppStore((state) => state.layout.editRecordData);
  const defaultCurrency = useAppStore((state) => state.currency);

  return (
    <>
      <main>
        <Outlet />
      </main>
      <BottomNavBar />
      <SlideUpOverlay open={isAddingRecord} id="1" onClose={toggleAddingRecord}>
        <AddEditRecord editData={editData} />
      </SlideUpOverlay>
      {!defaultCurrency && <InitialCurrencySelectOverlay />}
    </>
  );
};
