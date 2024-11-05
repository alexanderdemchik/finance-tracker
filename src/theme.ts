import { colorsTuple, createTheme, CSSVariablesResolver, DEFAULT_THEME, rem, virtualColor } from '@mantine/core';
import classes from './theme.module.css';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-color-body-light-heavy': theme.colors.dark[5],
    '--mantine-color-body-light': theme.colors.dark[6],
    '--mantine-color-body-dark': theme.colors.dark[8],
    '--mantine-color-body-dark-heavy': theme.colors.dark[9],
    '--mantine-color-error-text': theme.colors.red[6],
  },
  light: {},
  dark: {},
});

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#fbffe2',
      '#f7ffcc',
      '#eeff9b',
      '#e5ff64',
      '#ddff39',
      '#d8ff1d',
      '#d6ff09',
      '#bde300',
      '#a6c900',
      '#8eae00',
    ],
    dark: [
      '#f9f9f9',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#424242',
      '#3b3b3b',
      '#2e2e2e',
      '#242424',
      '#1f1f1f',
      '#141414',
    ],
    error: virtualColor({ name: 'error', dark: 'red', light: 'red' }),
  },
  spacing: {
    xxs: rem(6),
    xxxs: rem(4),
  },
  autoContrast: true,
  /** Put your mantine theme override here */
  components: {
    Button: {
      classNames: {
        root: classes.button,
      },
    },
  },
});
