import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Box, Button, Grid, CardContent, Card, Typography, IconButton } from '@mui/material'

import { AppContext, InputAutocomplete, Variant, getAutocompleteValue, icons } from 'core'
import { styles } from './countryCardStyles'
import { baseApiURL } from 'core/services'

type CountryCardProps = {
  countryCode: string
  description: string
  color: string
  name: string
  seeOptions: boolean
  img: string
  options: { value: number; label: string }[]
  setSeeOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const CountryCard: React.FC<CountryCardProps> = ({
  countryCode,
  description,
  color,
  options,
  name,
  seeOptions,
  img,
  setSeeOptions,
}) => {
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const [selectedValue, setSelectedValue] = useState()

  const handleCancel = () => {
    setValue(name, selectedValue)
    setSeeOptions(false)
  }

  const handleUpdate = () => {
    if (!getValues(name)) {
      setActMessage({ type: Variant.error, message: t('location.noOptionSelected') })
    } else {
      setValue('changesDetected', true)
      setSelectedValue(getValues(name))
      setSeeOptions(false)
    }
  }

  const isNull = useMemo(() => {
    return !getValues(name)
  }, [getValues(name), countryCode]) // eslint-disable-line

  useEffect(() => {
    setSelectedValue(getValues(name))
    if (isNull) setSeeOptions(true)
  }, [getValues(name), isNull]) // eslint-disable-line

  if (!seeOptions) {
    return (
      <Card sx={styles.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={7.7}>
              <Typography
                variant="body2"
                lineHeight={1}
                color="textSecondary"
                sx={{ ...styles.title, color: color }}
              >
                {countryCode}
              </Typography>
              <Typography
                variant="body2"
                lineHeight={1}
                color="textSecondary"
                sx={styles.descriptiom}
              >
                {description}
              </Typography>
            </Grid>
            <Grid item xs={4.3} sx={styles.boxImg}>
              {countryCode === '12h' || countryCode === '24h' ? (
                <Box sx={styles.logo}>
                  <img
                    src={img}
                    alt="Logo"
                    style={{
                      width: '40px',
                      borderRadius: '50%',
                      marginTop: '8px',
                    }}
                  />
                </Box>
              ) : (
                <Box sx={styles.logo}>
                  <img
                    src={baseApiURL + img}
                    alt="Logo"
                    style={{
                      width: '36px',
                      height: '36px',
                      marginTop: '8px',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              )}
              <Box sx={styles.iconStyles}>
                <IconButton onClick={() => setSeeOptions(true)}>{icons.edit}</IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={styles.cardOp}>
      <CardContent>
        {options && options.length > 0 && (
          <Grid container>
            <Grid item xs={12} sx={{ margin: '16px' }}>
              <InputAutocomplete
                label={description}
                placeholder={description}
                defaultValue={getAutocompleteValue(getValues(name), options)}
                options={options}
                control={control}
                name={name}
                disableClearable
                sx={{ marginRight: '16px' }}
                errors={errors.name?.message as string}
                helpertext={errors.name?.message as string}
              />
            </Grid>
            <Grid item xs={12} sx={styles.grid}>
              <Box sx={{ paddingRight: '12px' }}>
                <Button variant="contained" onClick={handleUpdate} sx={styles.btnAdd}>
                  {isNull ? t('location.modal.apply') : t('location.modal.add')}
                </Button>
              </Box>
              {!isNull && (
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                    sx={styles.btnCancel}
                  >
                    {t('location.modal.cancel')}
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}
