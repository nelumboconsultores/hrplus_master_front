import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'department' | 'role' | 'branch'> = {
  role: {
    fontSize: '20px',
    fontFamily: FontName.RobotoBold,
    color: '#24a9e2',
    lineHeight: '1.35rem',
    textAlign: 'center',
  },
  department: { fontSize: '18px', lineHeight: '1.35rem', textAlign: 'center', fontStyle: 'italic' },
  branch: {
    fontSize: '18px',
    color: '#828282',
    lineHeight: '1.35rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}
