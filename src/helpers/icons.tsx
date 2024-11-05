import { iconsToComponentsMap } from '../constants/iconsToComponentsMap';

export function getIconComponent(icon?: keyof typeof iconsToComponentsMap) {
  if (!icon) {
    return null;
  }

  const Icon = iconsToComponentsMap[icon];

  return <Icon />;
}
