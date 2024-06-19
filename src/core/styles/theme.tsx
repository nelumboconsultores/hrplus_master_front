import { createTheme } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'
import './../font/fonts.css'
import { FontName } from 'core/enum'
import { useMemo } from 'react'
import { esES } from '@mui/x-data-grid'
import { esES as coreEs } from '@mui/material/locale'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    mobile: true
    sm: true
    md: true
    lg: true
    xl: true
    laptop: true
  }
  interface TypographyVariants {
    grayText: React.CSSProperties
    grayTitle: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    grayText?: React.CSSProperties
    grayTitle?: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    grayText: true
    grayTitle: true
  }
}

export const useTheme = () => {
  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            primary: {
              main: '#24A9E2',
              100: '#E6F4FF',
              200: '#B3E0FF',
              300: '#80CCFF',
              400: '#4DB8FF',
              500: '#1AA4FF',
              600: '#0088FF',
              700: '#0058FF',
              800: '#3A3ADD',
              900: '#000066',
            },
            secondary: {
              main: '#31C462',
            },
            grey: {
              100: '#F2F2F2',
              200: '#d7d7d7',
              300: '#BDBDBD',
              400: '#828282',
              500: '#707070',
              600: '#686868',
              700: '#111111',
              800: '#e2e2e2',
              900: '#efefef',
            },
            error: {
              100: '#FEECEC',
              200: '#FCD8D8',
              300: '#F9BFBF',
              400: '#F48F8F',
              500: '#EC6666',
              600: '#D64545',
              700: '#B53131',
              800: '#7F1D1D',
              900: '#661616',
              main: '#F0142F',
            },
            background: {
              default: '#fff',
            },
          },
          breakpoints: {
            values: {
              xs: 0,
              mobile: 400,
              sm: 600,
              md: 900,
              laptop: 1024,
              lg: 1200,
              xl: 1536,
            },
          },
          typography: {
            allVariants: {
              fontFamily: FontName.RobotoRegular,
            },
            h1: {
              fontSize: '1.3rem',
              fontFamily: FontName.RobotoMedium,
              color: '#24A9E2',
            },
            h2: {
              fontSize: '1.1rem',
              fontFamily: FontName.RobotoMedium,
              color: '#24A9E2',
            },
            h3: {
              fontFamily: FontName.RobotoBold,
              color: '#686868',
              textTransform: 'uppercase',
              fontSize: '1rem',
            },
            grayText: {
              color: '#828282',
              lineHeight: '1.3rem',
              fontSize: '1rem',
            },
            grayTitle: {
              color: '#828282',
              lineHeight: '1.3rem',
              fontFamily: FontName.RobotoBold,
            },
          },
          components: {
            MuiCheckbox: {
              styleOverrides: {
                root: {
                  color: '#828282',
                },
              },
            },
            MuiButton: {
              styleOverrides: {
                root: ({ ownerState }) => ({
                  ...(ownerState.variant === 'contained' && {
                    color: '#fff',
                  }),
                  fontFamily: FontName.RobotoMedium,
                }),
              },
              defaultProps: {
                variant: 'contained',
                color: 'primary',
              },
            },

            MuiDataGrid: {
              styleOverrides: {
                columnHeader: {
                  sortIcon: {
                    color: '#fff',
                  },
                  backgroundColor: '#686868',
                  color: '#fff',
                },
                root: {
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontFamily: FontName.RobotoBold,
                  },
                  '& .MuiDataGrid-cellContent': {
                    color: '#828282',
                    fontFamily: FontName.RobotoRegular,
                  },
                  '& .MuiDataGrid-columnSeparator': { visibility: 'visible' },
                },
              },
            },
            MuiDrawer: {
              styleOverrides: {
                root: {
                  '*::-webkit-scrollbar': {
                    width: '2px',
                    height: '2px',
                  },
                  '*::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,0,0,.3)',
                    borderRadius: '4px',
                  },
                },
              },
            },
            MuiPaper: {
              styleOverrides: {
                root: {
                  '&&::-webkit-scrollbar': { width: '4px' },
                  '&&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,0,0,.3)',
                    borderRadius: '3px',
                  },
                },
              },
            },
            MuiGrid: {
              styleOverrides: {
                root: {
                  '&&::-webkit-scrollbar': { width: '4px' },
                  '&&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,0,0,.3)',
                    borderRadius: '3px',
                  },
                },
              },
            },
          },
        },
        esES,
        coreEs,
      ),
    [],
  )

  return theme
}
