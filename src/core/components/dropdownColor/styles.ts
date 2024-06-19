import { SxStyles } from 'core'
import { FontName } from 'core'
export const styles: SxStyles<
  | 'menuItem'
  | 'listItem'
  | 'container'
  | 'createIcon'
  | 'modalContainer'
  | 'titleModal'
  | 'subTitleModal'
  | 'boxModal'
  | 'btnRadioModal'
  | 'hex'
  | 'textFieldModal'
  | 'btnCancel'
  | 'btnSave'
  | 'btns'
  | 'colorText'
> = {
  container: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ':hover .edit-icon': { visibility: 'visible' },
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  createIcon: {
    color: 'black',
    visibility: 'hidden',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px 10px',
    gap: 1,
  },
  titleModal: {
    fontSize: '1.1rem',
    color: '#7c828a',
    fontFamily: FontName.RobotoBold,
  },
  subTitleModal: {
    fontSize: '1rem',
    color: '#7c828a',
    paddingBottom: '8px',
    fontFamily: FontName.RobotoBold,
  },
  boxModal: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    paddingTop: '20px',
  },
  btnRadioModal: {
    width: '24px',
    height: '24px',
    marginBottom: '2px',
    borderRadius: '50%',
  },
  hex: {
    paddingLeft: '20px',
    color: '#939599',
    fontFamily: FontName.RobotoRegular,
  },
  colorText: {
    color: '#7C828A',
    fontFamily: FontName.RobotoRegular,
    textDecoration: 'underline',
  },
  textFieldModal: {
    maxWidth: '100px',
    marginLeft: 1,
  },
  btnCancel: {
    textTransform: 'capitalize',
    color: '#7c828a',
  },
  btnSave: {
    textTransform: 'capitalize',
  },
  btns: {
    textAlign: 'end',
  },
}
