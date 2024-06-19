import { SxStyles } from 'core/types'

export const useStyles = (
  onClose: boolean,
  width?: number | string,
  borderRadius?: number,
): SxStyles<'modalGeneral' | 'iconClose'> => ({
  iconClose: {
    display: onClose ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modalGeneral: {
    position: 'absolute',
    borderRadius: borderRadius ? borderRadius : '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ? width : 550,
    bgcolor: 'background.paper',
    boxShadow: 16,
  },
})
