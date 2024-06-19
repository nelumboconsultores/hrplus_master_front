import { SxStyles } from 'core/types'

export const useStyles = (
  placeholder?: string,
): SxStyles<'stPlaceHolder' | 'hideNumberInputArrows'> => ({
  stPlaceHolder: {
    '& .MuiSelect-select .notranslate::after': placeholder
      ? {
          content: `"${placeholder}"`,
          opacity: 0.42,
        }
      : {},
  },
  hideNumberInputArrows: {
    '& input[type=number]': {
      MozAppearance: 'textfield',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
    },
  },
})
