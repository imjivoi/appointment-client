import { GlobalThemeOverrides } from 'naive-ui'

import { theme } from '#tailwind-config'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: theme.colors.primary[500],
    primaryColorHover: theme.colors.primary[400],
    primaryColorPressed: theme.colors.primary[600],
    borderRadius: theme.borderRadius.lg,
  },
  DatePicker: {
    itemBorderRadius: '5px',
  },
}

export { themeOverrides }
