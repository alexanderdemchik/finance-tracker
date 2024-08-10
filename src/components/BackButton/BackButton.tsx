import { Flex } from '@mantine/core';
import { MouseEvent } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

interface IBackButtonProps {
  onClick?: (e: MouseEvent) => void;
}

export function BackButton({ onClick }: IBackButtonProps) {
  const navigate = useNavigate();
  return (
    <Flex
      role="button"
      tabIndex={-1}
      onClick={(e) => (onClick ? onClick(e) : navigate(-1))}
      align="center"
      justify="center"
    >
      <TbArrowLeft size={20} />
    </Flex>
  );
}
