import { GlobalThemeOverrides } from 'naive-ui'

import { theme } from '#tailwind-config'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: theme.colors.primary[500],
    primaryColorHover: theme.colors.primary[400],
    primaryColorPressed: theme.colors.primary[600],
    borderRadius: theme.borderRadius.lg,
    successColor: theme.colors.primary[500],
    successColorHover: theme.colors.primary[400],
    successColorPressed: theme.colors.primary[600],
    errorColor: theme.colors.error[500],
    errorColorHover: theme.colors.error[500],
    errorColorPressed: theme.colors.error[500],
    warningColor: theme.colors.warning[500],
    warningColorHover: theme.colors.warning[500],
    warningColorPressed: theme.colors.warning[500],
  },
  DatePicker: {
    itemBorderRadius: '5px',
  },
}

export { themeOverrides }
