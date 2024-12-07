import clsx from 'clsx';
import { AvailableIconsType, iconsToComponentsMap } from '../../constants/iconsToComponentsMap';
import classes from './ColoredIcon.module.css';

interface ICategoryIconProps {
  icon: AvailableIconsType;
  color?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColoredIcon({ icon, color, selected, onClick = () => {} }: ICategoryIconProps) {
  const Icon = iconsToComponentsMap[icon];

  return (
    <div
      className={clsx(classes.wrapper, { [classes.selected]: selected })}
      style={{ '--color': color || 'var(--mantine-primary-color-filled)' }}
      onClick={onClick}
    >
      <Icon size={14} />
    </div>
  );
}
