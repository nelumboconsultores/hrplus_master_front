import { Box, Button, Typography } from '@mui/material'
import { DynamicFormValues, DynamicGrid } from 'core'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { styles } from './styles'
import { useArrayFilters } from 'modules/users/utils'

export const FiltersForm = () => {
  const { initVal, getDataTable, setInitVal, listGroups } = useContext(UsersContext)
  const arrayFilters = useArrayFilters(listGroups)

  const methods = useForm<DynamicFormValues>({
    defaultValues: initVal,
  })

  const onSubmit: SubmitHandler<DynamicFormValues> = async (data) => {
    setInitVal(data)
    await getDataTable(
      1,
      20,
      undefined,
      undefined,
      data.search as string,
      data.groupIds as number[],
    )
  }
  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
        Filtrar por
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '28px',
            justifyContent: 'space-between',
          }}
        >
          <DynamicGrid xs={12} listInputs={arrayFilters} rowSpacing={'24px'} />
          <Box sx={{ textAlign: 'right', padding: '12px 0px' }}>
            <Button type="submit" color="secondary" sx={styles.button}>
              Filtrar
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}
