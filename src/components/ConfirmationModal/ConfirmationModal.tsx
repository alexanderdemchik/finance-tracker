import { Group, Modal, Stack, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { ReactNode } from 'react';

export function ConfirmationModal({
  title,
  actions,
  children,
}: {
  title: string;
  actions: (toggle: (b?: boolean) => void) => ReactNode[];
  children: (a: { open: boolean; toggle: (b?: boolean) => void }) => ReactNode;
}) {
  const [open, toggle] = useToggle();

  return (
    <>
      <Modal
        opened={open}
        onClose={() => toggle()}
        centered
        title={<Text size="sm">{title}</Text>}
        withCloseButton={false}
      >
        <Group justify="end" gap="xxs">
          {actions(toggle)}
        </Group>
      </Modal>
      {children({ open, toggle })}
    </>
  );
}
