import { TFunction } from 'i18next';

export function getAccountTitle(title: string, translationFn: TFunction) {
  return title === '_default_' ? translationFn('default-account-name') : title;
}
