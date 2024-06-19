import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'tapsContainer' | 'itemTitle' | 'onlyTitle'> = {
  tapsContainer: {
    backgroundColor: 'grey.900',
    '& .MuiTab-root': {
      fontWeight: 600,
      textTransform: 'none',
      padding: '28px 16px',
    },
    '& .Mui-selected': {
      backgroundColor: 'grey.200',
    },
    '& .MuiTabs-indicator': {
      height: '4px',
    },
  },
  itemTitle: {
    '&.MuiTab-root': {
      alignItems: ' flex-start',
      fontSize: ' 1.3rem',
      color: 'primary.main',
      opacity: 1,
      marginLeft: '24px',
      fontFamily: FontName.RobotoMedium,
    },
  },
  onlyTitle: {
    backgroundColor: 'grey.900',
    padding: '26px 16px',
    '& .title': {
      fontSize: ' 1.3rem',
      color: 'primary.main',
      opacity: 1,
      fontWeight: 600,
      marginLeft: '24px',
      fontFamily: FontName.RobotoMedium,
    },
  },
}
