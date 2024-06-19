import { Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { KeyLabels } from '../../enums/keyLabels'
import { useTranslation } from 'react-i18next'
import { WorkPositionsContext } from '../../context'
type GenInfo = {
  title: string
  value: string | number | boolean | number[]
}

export const GenInfoDetail = () => {
  const { modelState } = useContext(WorkPositionsContext)
  const [arrayGenInfo, setArrayGenInfo] = useState<GenInfo[]>([])
  const { t } = useTranslation()
  useEffect(() => {
    if (arrayGenInfo.length === 0) {
      const notShowKeys = ['denomination', 'code']
      const localFields = ['countryId', 'stateId', 'cityId']
      for (const [key, value] of Object.entries(modelState.formInformation ?? {})) {
        let auxValue = value === null || value === undefined || value === '' ? '-' : value
        let auxKey = key
        if (typeof value === 'boolean') auxValue = validationsYesOrNot(value)
        if (localFields.includes(key)) auxKey = localLabels(key)
        if (notShowKeys.includes(key)) continue
        console.log(auxKey, auxValue)
        //setArrayGenInfo((prev) => [...prev, { title: auxKey, value: auxValue ?? '-' }])
        setArrayGenInfo([])
      }
    }
  }, [modelState.formInformation]) // eslint-disable-line

  const validationsYesOrNot = (value: boolean) => (value ? 'Si' : 'No')
  const localLabels = (key: string) => {
    switch (key) {
      case KeyLabels.country:
        return t(`instancesWorkPositions.creation.label.country`)
      case KeyLabels.state:
        return t(`instancesWorkPositions.creation.label.state`)
      case KeyLabels.city:
        return t(`instancesWorkPositions.creation.label.city`)
      default:
        return key
    }
  }

  return (
    <Grid container spacing={1} justifyContent="flex-start" alignItems="flex-end">
      {arrayGenInfo.map((item, key) => {
        return (
          <Grid item xs={3} key={key}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', lineHeight: 1 }}>
              {item.value}
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', color: 'gray' }}>{item.title}</Typography>
          </Grid>
        )
      })}
    </Grid>
  )
}
