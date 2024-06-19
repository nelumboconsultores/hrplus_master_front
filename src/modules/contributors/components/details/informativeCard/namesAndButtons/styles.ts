import { darken } from '@mui/material'
import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'root' | 'name' | 'lastName' | 'mail' | 'phone' | 'age'> = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0 0 0',
  },
  name: { fontFamily: FontName.RobotoBold, fontSize: '20px', lineHeight: '1.2rem' },
  lastName: { fontFamily: FontName.RobotoBold, fontSize: '18px', lineHeight: '1.2rem' },
  mail: {
    backgroundColor: '#cbf0d7',
    color: '#4dcc78',
    '&:hover': {
      backgroundColor: darken('#cbf0d7', 0.1),
    },
  },
  phone: {
    backgroundColor: '#e2d6f6',
    color: '#7b46d4',
    '&:hover': {
      backgroundColor: darken('#e2d6f6', 0.1),
    },
  },
  age: { color: '#828282', lineHeight: '1.2rem', fontStyle: 'italic' },
}
