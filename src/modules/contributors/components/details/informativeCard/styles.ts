import { darken } from '@mui/material'
import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'root'
  | 'divider'
  | 'activate'
  | 'update'
  | 'titleModal'
  | 'btnModal'
  | 'modal'
  | 'btnSave'
  | 'btnCancel'
> = {
  root: {
    boxSizing: 'border-box',
    padding: 2,
    position: 'relative',
  },
  divider: {
    width: '110%',
    position: 'relative',
    right: '16px',
  },
  activate: {
    mt: 1,
    backgroundColor: '#cbf0d7',
    color: '#31c462',
    fontFamily: FontName.RobotoBold,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: darken('#cbf0d7', 0.1),
    },
    flex: 1,
    width: '150px',
    padding: '12px 0',
  },
  update: {
    backgroundColor: '#eaf2fd',
    color: '#0058ff',
    textTransform: 'none',
    fontFamily: FontName.RobotoBold,
    '&:hover': {
      backgroundColor: darken('#eaf2fd', 0.1),
    },
    flex: 1,
    padding: '12px 0',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 58px',
    gap: 2,
  },
  titleModal: {
    color: '#171774',
    fontSize: '1.1rem',
    textAlign: 'center',
    fontFamily: FontName.RobotoBold,
  },
  btnModal: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnSave: {
    padding: '8px 28px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: FontName.RobotoRegular,
  },
  btnCancel: {
    color: '#ef7979',
    textTransform: 'none',
    fontSize: '1rem',
  },
}
