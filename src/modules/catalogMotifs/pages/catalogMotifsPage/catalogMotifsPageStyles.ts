import { SxStyles } from 'core/types'

export const styles: SxStyles<
  'container' | 'title' | 'text' | 'btn' | 'pad' | 'padComp' | 'padGrid'
> = {
  container: {
    justifyContent: 'end',
    paddingBottom: '20px',
  },
  title: {
    width: '300px',
    marginBottom: '28px',
  },
  text: {
    textAlign: 'end',
  },
  btn: {
    background: '#31C462',
    color: '#fff',
    width: '175px',
    height: '48px',
  },
  pad: {
    padding: '40px 4px',
  },
  padGrid: {
    paddingRight: '10px',
  },
  padComp: {
    paddingBottom: '10px',
  },
}
