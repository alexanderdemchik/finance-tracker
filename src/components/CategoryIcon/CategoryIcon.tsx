import { AvailableIconsType, iconsToComponentsMap } from '../../constants/iconsToComponentsMap';
import { getDefaultGradient } from '../../helpers/getDefaultGradient';
import classes from './CategoryIcon.module.css';

interface ICategoryIconProps {
  icon: AvailableIconsType;
  color?: string;
}

export function CategoryIcon({ icon, color }: ICategoryIconProps) {
  const Icon = iconsToComponentsMap[icon];
  const bg = getDefaultGradient(color);

  return (
    <div className={classes.wrapper} style={{ background: bg }}>
      <Icon size={14} />
    </div>
  );
}
