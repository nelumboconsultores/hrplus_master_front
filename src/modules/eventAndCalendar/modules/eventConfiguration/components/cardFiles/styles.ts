import { SxStyles } from 'core'

export const styles: SxStyles<'gridFather' | 'boxImg' | 'boxTexts' | 'description' | 'deleteCart'> =
  {
    gridFather: { display: 'flex', height: '100%', alignItems: 'center' },
    boxImg: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      height: '39px',
    },
    boxTexts: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1,
    },
    deleteCart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
  }
