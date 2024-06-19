import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { alpha, styled } from '@mui/material/styles'

const ODD_OPACITY = 0.2
interface StripedDataGridProps {
  variant: string
  open: boolean
}
export const StripedDataGrid = styled(DataGrid)<StripedDataGridProps>(({ theme, variant }) => ({
  width: '100%',
  transition: 'width 1s ease',
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: VariantTwo[variant as keyof typeof VariantTwo],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),

        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: VariantOne[variant as keyof typeof VariantOne],

    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),

        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },

  '& .bold-cell': {
    fontWeight: 'bold',
    '& .MuiDataGrid-cellContent': {
      color: '#000',
    },
  },

  '& .green-text': {
    '& .MuiDataGrid-cellContent': {
      color: '#828282',
      paddingLeft: '30px',
    },
  },
  '& .MuiButtonBase-root': {
    color: '#ADADAD',

    '&.MuiCheckbox-root': {
      '&.Mui-checked': { color: theme.palette.secondary.main },
    },
  },
  '& .cell:focus,.MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
}))

enum VariantOne {
  error = '#fbe0e0',
  standard = '#F3F4FF',
}

enum VariantTwo {
  error = '#fdeded',
  standard = '#ffffff',
}
