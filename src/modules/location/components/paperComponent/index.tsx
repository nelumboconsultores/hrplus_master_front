import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Paper, Grid, FormControlLabel, Typography, Box, Checkbox } from '@mui/material'

import { CardSwitch } from 'modules/incidents/hooks/cardSwitch'
import { ListHolidays } from 'modules/location/types'
import { styles } from './paperComponentStyles'
import Spinner from 'core/components/spinner'

type PaperComponentProps = {
  countryCode: string
  holidays: {
    holidays: (ListHolidays & { isActive: boolean })[]
    isDefaultSelected: boolean
    countryOfHolidays: string
  }
  holidaysList: Omit<ListHolidays, 'id'>[]
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<ListHolidays[]>>
  selectedCheckboxes: ListHolidays[]
  setValue: UseFormSetValue<{ countryCode: number; timeCode: number; changesDetected: boolean }>
  setChangeSwitch: React.Dispatch<React.SetStateAction<boolean>>
}
export const PaperComponent: React.FC<PaperComponentProps> = ({
  countryCode,
  holidays,
  holidaysList,
  setSelectedCheckboxes,
  selectedCheckboxes,
  setValue,
  setChangeSwitch,
}) => {
  const { t } = useTranslation()
  const [switchValue, setSwitchValue] = useState(holidays.isDefaultSelected)

  const handleSwitchChange = () => {
    setSwitchValue((prevSwitchValue) => {
      if (prevSwitchValue) setSelectedCheckboxes([])
      return !prevSwitchValue
    })
  }

  const isChecked = (date: string) => selectedCheckboxes.some((item) => item.date === date)
  const handleCheckboxChange = (date: string) => {
    const needRemove = isChecked(date)
    if (switchValue && needRemove) setSwitchValue(false)

    if (needRemove) {
      setSelectedCheckboxes((prev) => prev.filter((item) => item.date !== date))
    } else {
      const itemInfo = holidaysList.find((item) => item.date === date)
      if (itemInfo) {
        setSelectedCheckboxes((prev) => {
          const all = [...prev, { ...itemInfo, id: null }]
          const allAreSelected = all.length === holidaysList.length

          if (allAreSelected) setSwitchValue(true)
          return all
        })
      }
    }
    setValue('changesDetected', true)
  }

  useEffect(() => {
    if (switchValue) {
      setSelectedCheckboxes(holidaysList.map((item) => ({ ...item, id: null })))
      setValue('changesDetected', true)
    }
    setChangeSwitch(switchValue)
  }, [switchValue, holidaysList, setSelectedCheckboxes]) // eslint-disable-line
  return (
    <>
      <Paper elevation={3} sx={styles.paper}>
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          sx={{ display: 'flex', justifyContent: 'start' }}
        >
          <Grid item>
            <FormControlLabel
              control={
                <CardSwitch
                  sx={styles.cardStyles}
                  checked={switchValue}
                  onChange={handleSwitchChange}
                />
              }
              label={''}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={styles.title}>
              {`${t('location.title.table')}${countryCode}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={styles.paperData}>
        {!holidaysList.length ? (
          <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Spinner />
          </Box>
        ) : (
          <Grid container sx={styles.container}>
            {holidaysList.map((feriado, index) => (
              <Grid item xs={5} key={index} sx={styles.grid}>
                <Box>
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        sx={styles.checked}
                        checked={isChecked(feriado.date)}
                        name={feriado.name}
                        onChange={() => handleCheckboxChange(feriado.date)}
                      />
                    }
                    label=""
                  />
                </Box>
                <Box sx={styles.labelChecked}>
                  <Typography lineHeight={1.1} sx={styles.label}>
                    {feriado.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </>
  )
}
