import { Box } from '@mui/material'

const IconValue = (props: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        '& .MuiIcon-root': {
          color: 'grey.400',
          fontSize: '24px',
          '& .MuiSvgIcon-root': {
            fontSize: 'inherit',
            width: 'inherit',
            height: 'inherit',
          },
        },
        '& .MuiTypography-root': {
          fontSize: '14px',
          fontWeight: 'bold',
          '&.secondary': {
            color: 'secondary.main',
          },
          '&.primary': {
            color: 'primary.main',
          },
        },
      }}
    >
      {props.children}
    </Box>
  )
}

export { IconValue }
