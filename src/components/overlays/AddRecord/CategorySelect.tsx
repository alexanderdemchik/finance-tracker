import { useMemo } from 'react';
import { SimpleGrid, Stack, Text } from '@mantine/core';
import clsx from 'clsx';
import { useToggle } from '@mantine/hooks';
import { FaPlus } from 'react-icons/fa6';
import { iconsToComponentsMap } from '../../../constants/iconsToComponentsMap';
import classes from './CategorySelect.module.css';
import { RecordTypeEnum } from '../../../store/types';
import { useCategories } from '../../../hooks/useCategories';
import { SlideUpOverlay } from '../../../layout/SlideUpOverlay/SlideUpOverlay';
import { CategorySettings } from '../CategorySettings/CategorySettings';

interface ICategorySelectProps {
  type: RecordTypeEnum;
  value?: string;
  onChange: (val: string) => void;
}

export function CategorySelect({ type, value, onChange }: ICategorySelectProps) {
  const [isCategorySettingsOpen, toggle] = useToggle();
  const categories = useCategories();
  const categoriesToDisplay = useMemo(
    () => categories.raw.filter((el) => el.type === type),
    [type, categories]
  );

  return (
    <SimpleGrid cols={4} p="md">
      {categoriesToDisplay.map((cat) => {
        const Icon = iconsToComponentsMap[cat.icon];
        return (
          <Stack
            key={cat.id}
            align="center"
            gap={1}
            className={clsx(classes.category, { [classes.active]: value === cat.id })}
            onClick={() => onChange(cat.id)}
          >
            <div
              className={classes['icon-wrapper']}
              style={{ '--color': cat.color || 'var(--mantine-primary-color-filled)' }}
            >
              <Icon />
            </div>
            <Text size="sm">{cat.title}</Text>
          </Stack>
        );
      })}
      <Stack align="center" gap={1} className={classes.category} onClick={() => toggle()}>
        <div className={clsx(classes['icon-wrapper'], classes['settings-icon'])}>
          <FaPlus />
        </div>
        <Text size="sm">Настройки</Text>
      </Stack>

      <SlideUpOverlay open={isCategorySettingsOpen} onClose={toggle} id="cat-settings">
        <CategorySettings />
      </SlideUpOverlay>
    </SimpleGrid>
  );
}
