import { styled } from '@mui/material'
import { StaticDatePicker } from '@mui/x-date-pickers'
import { FontName } from 'core'

const CustomizedStaticDatePicker = styled(StaticDatePicker)(
  ({ theme }) => `
    .MuiPickersCalendarHeader-labelContainer {
      cursor: default;
      width: inherit
    }
    .header-calendar {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      font-family: ${FontName.RobotoRegular}
    }
    .MuiDateCalendar-root {
      justify-content: start;
      height: 250px;
    }
    .MuiPickersCalendarHeader-labelContainer{
      width: 100%;
    }
    .MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected) {
      border: none
    }
    .MuiPickersCalendarHeader-labelContainer:after {
      content: "YEARr";
      color: ${theme.palette.background.default};
      background-color: ${theme.palette.background.default};
      position: relative;
      left: -55px;
      // border: 1px solid red; 
    }
  `,
)

const hideArrow = {
  sx: {
    display: 'none',
  },
}

const drawer = {
  close: {
    '& .MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition': {
      height: '170px',
      minHeight: 'auto',
    },
    '& .MuiPickersLayout-root': {
      minWidth: '100%',
    },
    '& .MuiDateCalendar-root': {
      width: '100%',
      height: '250px',
      justifyContent: 'start',
    },
    '& .MuiDayCalendar-header': {
      justifyContent: 'space-evenly',
    },
    '& .MuiDayCalendar-weekContainer': {
      justifyContent: 'space-evenly',
    },
    '& .MuiPickersDay-root': {
      width: '25px',
      height: '25px',
    },
    '& .MuiDayCalendar-weekDayLabel': {
      width: '25px',
      height: '25px',
    },
  },
}
const useCalendarWithEventsStyles = () => {
  return {
    constainer: {
      ...drawer.close,
    },
  }
}
export { CustomizedStaticDatePicker, hideArrow, useCalendarWithEventsStyles }
