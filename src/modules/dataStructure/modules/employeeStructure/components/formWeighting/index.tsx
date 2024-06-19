import { Box, Button, Grid } from '@mui/material'
import { PercentageField } from '../percentageField'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AppContext, PathName, Variant, useBuildSchema } from 'core'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext } from 'react'
import { styles } from './styles'
import { SectionType } from '../../types'
import { setChangeWeight } from '../../services/model.services'
import { useNavigate } from 'react-router-dom'
type FormWeightingProps = {
  arrayInputs: SectionType[]
}

export const FormWeighting: React.FC<FormWeightingProps> = ({ arrayInputs }) => {
  const { t } = useTranslation()
  const { buildSchema } = useBuildSchema()
  const { setActMessage, open } = useContext(AppContext)
  const rowLength = Number((arrayInputs.length / 3).toFixed())
  const navigate = useNavigate()
  const methods = useForm({
    resolver: zodResolver(z.object(buildSchema(arrayInputs))),
    defaultValues: arrayInputs.reduce(
      (acc: Record<string, number>, item) => ({ ...acc, [item.name]: item.weight }),
      {},
    ),
  })
  const onSubmit = async () => {
    if (validateHundredPercent()) return
    const body = arrayInputs.map((item) => ({
      keyword: item.name,
      weight: methods.watch(item.name),
    }))

    const response = await setChangeWeight(body)
    if (response.data) {
      setActMessage({
        type: Variant.success,
        message: t('companyStructure.messages.theConfigurationHasBeenSavedSuccessfully'),
      })
      navigate(PathName.employeeStructure)
    }
    if (response.error) {
      setActMessage({
        type: Variant.error,
        message: t('companyStructure.messages.errorSavingConfiguration'),
      })
    }
  }
  const validateHundredPercent = () => {
    let sum = 0
    arrayInputs.forEach((item) => {
      sum += methods.watch(item.name)
    })
    if (sum !== 100) {
      setActMessage({
        type: Variant.error,
        message: t('companyStructure.validations.theSumPercentagesMustBe'),
      })
      return true
    }
    return false
  }

  const splitArray = () => {
    //Split the array into three columns
    const result = []
    for (let i = 0; i < arrayInputs.length; i += rowLength) {
      result.push(arrayInputs.slice(i, i + rowLength))
    }
    return result
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container columnSpacing={{ xs: 1, lg: 8 }} rowSpacing={3} sx={{ marginTop: '20px' }}>
          {splitArray().map((item, index) => (
            <Grid item key={index} xs={open ? 6 : 4} lg={4}>
              {item.map((item, index) => (
                <Box key={index} sx={{ my: 3 }}>
                  <PercentageField title={item.title} name={item.name} />
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          onClick={() => {
            if (
              typeof methods.formState.errors === 'object' &&
              Object.keys(methods.formState.errors).length > 0
            ) {
              setActMessage({
                type: Variant.error,
                message: t(
                  'companyStructure.validations.fieldsMustCompletedBeforeConfigurationSaved',
                ),
              })
            }
          }}
          variant="contained"
          color="secondary"
          sx={styles.button}
        >
          {t('general.button.save')}
        </Button>
      </form>
    </FormProvider>
  )
}
