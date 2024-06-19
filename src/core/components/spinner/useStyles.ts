import { SxStyles } from 'core'

export const useStyles = (
  size: number,
  topAndLeft: string,
  widthAndHeight: string,
  containerHeight: number,
): SxStyles<'container' | 'body'> => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: `${containerHeight}px`,
  },
  body: {
    position: 'relative',
    display: 'inline-block',
    width: `${size || 80}px`,
    height: `${size || 80}px`,
    '& div': {
      position: 'absolute',
      border: `4px solid`,
      opacity: 1,
      borderRadius: '50%',
      animation: 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
    },
    '& div:nth-of-type(2)': {
      animationDelay: '-0.5s',
    },
    ' @keyframes lds-ripple': {
      '0%': {
        top: topAndLeft,
        left: topAndLeft,
        width: '0',
        height: '0',
        opacity: '0',
      },
      '4.9%': {
        top: topAndLeft,
        left: topAndLeft,
        width: '0',
        height: '0',
        opacity: '0',
      },
      '5%': {
        top: topAndLeft,
        left: topAndLeft,
        width: '0',
        height: '0',
        opacity: '1',
      },
      '100%': {
        top: '0px',
        left: '0px',
        width: widthAndHeight,
        height: widthAndHeight,
        opacity: '0',
      },
    },
  },
})
