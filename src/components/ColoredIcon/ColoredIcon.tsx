import { AvailableIconsType, iconsToComponentsMap } from '../../constants/iconsToComponentsMap';
import classes from './ColoredIcon.module.css';

interface ICategoryIconProps {
  icon: AvailableIconsType;
  color?: string;
}

export function ColoredIcon({ icon, color }: ICategoryIconProps) {
  const Icon = iconsToComponentsMap[icon];

  return (
    <div className={classes.wrapper} style={{ '--color': color || 'var(--mantine-primary-color-filled)' }}>
      <Icon size={14} />
    </div>
  );
}
