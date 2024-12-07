import { Reorder, useDragControls } from 'framer-motion';
import { Button, Flex, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { IoReorderTwo } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';
import { useToggle } from '@mantine/hooks';
import { useCategories } from '../../hooks/useCategories';
import { PageHeaderLayout } from '../../layout/PageHeaderLayout/PageHeaderLayout';
import { PageLayout } from '../../layout/PageLayout/PageLayout';
import { BackButton } from '../../components/BackButton/BackButton';
import classes from './CategorySettings.module.css';
import { ColoredIcon } from '../../components/ColoredIcon/ColoredIcon';
import { SwipeableTabs } from '../../layout/SwipeableTabs/SwipeableTabs';
import { SlideUpOverlay } from '../../layout/SlideUpOverlay/SlideUpOverlay';
import { AddCategory } from './AddCategory';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';
import { ICategory } from '@/types/ICategory';

const tabs = [RecordTypeEnum.EXPENSES, RecordTypeEnum.INCOME];

export function CategorySettings() {
  const [activeTab, toggleTab] = useToggle(tabs);
  const [isAddCatOpen, toggleIsAddCatOpen] = useToggle();

  const onChangeTab = useCallback((i: number) => toggleTab(tabs[i]), []);

  return (
    <PageLayout
      header={
        <PageHeaderLayout left={<BackButton />} title="Категории">
          <SegmentedControl
            styles={{ root: { borderRadius: 0 } }}
            data={[
              { label: 'Расходы', value: RecordTypeEnum.EXPENSES },
              { label: 'Доходы', value: RecordTypeEnum.INCOME },
            ]}
            value={activeTab}
            onChange={(val) => toggleTab(val as RecordTypeEnum)}
          />
        </PageHeaderLayout>
      }
    >
      <SwipeableTabs value={tabs.indexOf(activeTab)} onChange={onChangeTab}>
        <CategorySettingsTab key={1} type={RecordTypeEnum.EXPENSES} />
        <CategorySettingsTab type={RecordTypeEnum.INCOME} key={2} />
      </SwipeableTabs>

      <Flex className={classes['add-btn']}>
        <Button fullWidth onClick={() => toggleIsAddCatOpen()} size="md">
          Добавить категорию
        </Button>
      </Flex>

      <SlideUpOverlay open={isAddCatOpen} onClose={toggleIsAddCatOpen} id="cat-create">
        <AddCategory />
      </SlideUpOverlay>
    </PageLayout>
  );
}

const CategorySettingsTab = memo(({ type }: { type: RecordTypeEnum }) => {
  const { setCategories, categories, toggleCategoryVisibility } = useCategories();

  const [displayedCategories, hiddenCategories] = useMemo(
    () => [
      categories.filter((el) => !el.hidden).filter((el) => el.type === type),
      categories.filter((el) => el.hidden).filter((el) => el.type === type),
    ],
    [categories]
  );

  const setMergedCategories = useCallback(
    (catsWithoutHidden: ICategory[]) => {
      const result = [...catsWithoutHidden];

      categories.forEach((el, i) => {
        if (el.hidden || el.type !== type) {
          result.splice(i, 0, el);
        }
      });

      setCategories(result);
    },
    [categories]
  );

  return (
    <Stack gap={0} className={classes['list-wrapper']}>
      <Reorder.Group
        axis="y"
        onReorder={setMergedCategories}
        values={displayedCategories}
        className={classes.list}
        layoutScroll
      >
        {displayedCategories.map((el) => (
          <CategoryListItem item={el} key={el.id} toggleVisibility={toggleCategoryVisibility} />
        ))}
      </Reorder.Group>
      <ul>
        {hiddenCategories.map((el) => (
          <CategoryListItem item={el} key={el.id} toggleVisibility={toggleCategoryVisibility} />
        ))}
      </ul>
    </Stack>
  );
});

const CategoryListItem = memo(
  ({ item, toggleVisibility }: { item: ICategory; toggleVisibility: (id: string) => void }) => {
    const [ref, setRef] = useState<HTMLDivElement>();

    useEffect(() => {
      const f = (e: PointerEvent) => {
        dragControls.start(e);
        e.preventDefault();
        e.stopPropagation();
      };

      ref?.addEventListener('pointerdown', f);

      return () => {
        ref?.removeEventListener('pointerdown', f);
      };
    }, [ref]);

    const dragControls = useDragControls();

    const content = (
      <Group gap="xs">
        <Flex
          className={clsx(classes['hide-btn'], { [classes.hidden]: item.hidden })}
          onClick={() => toggleVisibility(item.id)}
        >
          {item.hidden ? <FaPlus /> : <FaMinus />}
        </Flex>
        <ColoredIcon icon={item.icon} color={item.color} />
        <Text size="sm" style={{ userSelect: 'none' }}>
          {item.title}
        </Text>
      </Group>
    );

    if (item.hidden) {
      return <li>{content}</li>;
    }

    return (
      <Reorder.Item key={item.id} value={item} id={item.id} dragControls={dragControls} dragListener={false}>
        {content}
        <Flex ref={(r) => setRef(r!)} style={{ cursor: 'grab', touchAction: 'none' }}>
          <IoReorderTwo />
        </Flex>
      </Reorder.Item>
    );
  }
);
