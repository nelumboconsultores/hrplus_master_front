import { Button, Grid, Typography } from '@mui/material'
import {
  DynamicFormValues,
  DynamicGrid,
  InputAutocomplete,
  InputMultiSelect,
  InputSearch,
  TemplatePaper,
  useValidations,
} from 'core'
import { styles } from './styles'
import { JSONConfigurations } from 'modules/users/utils/JSONConfigurations'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBuildSchema } from 'core/utils/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext } from 'react'
import { UsersContext } from 'modules/users/context'

export const UserForm: React.FC = () => {
  const { t } = useTranslation()
  const { setView, setInitVal, listGroups, getDataTable } = useContext(UsersContext)
  const { buildSchema } = useBuildSchema()
  const { val } = useValidations()
  const methods = useForm<DynamicFormValues>({
    resolver: zodResolver(
      z.object({
        ...buildSchema(JSONConfigurations),
        search: val.searchOptional,
        groupIds: val.groupOptional,
        role: val.roleOptional,
      }),
    ),
  })
  const onSubmit: SubmitHandler<DynamicFormValues> = (data) => {
    getDataTable(1, 20, undefined, undefined, data.search as string, data.groupIds as number[])
    setInitVal(data)
    setView(true)
  }

  return (
    <TemplatePaper title={t('users.title.userSelection')}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Grid container columnSpacing={4}>
            <Grid item xs={12}>
              <Typography sx={styles.title}>{t('users.organizationalStructure')}</Typography>
              <DynamicGrid listInputs={JSONConfigurations} spacing={4} />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={styles.title}>{t('users.inputs.byGroup')}</Typography>

              <InputMultiSelect
                control={methods.control}
                name="groupIds"
                options={listGroups}
                label={t('users.inputs.group')}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={styles.title}>{t('users.inputs.byRoles')}</Typography>
              <InputAutocomplete
                control={methods.control}
                name={'role'}
                disabled
                label={t('users.inputs.userRole')}
                options={[]}
                placeholder={t('users.inputs.exampleRoleName')}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={styles.title}>{t('users.inputs.byUsers')}</Typography>
              <InputSearch
                {...methods.register('search')}
                label={t('users.inputs.search')}
                inputProps={{ maxLength: 75 }}
                placeholder={t('users.inputs.enterTheSearchValue')}
              />
            </Grid>
          </Grid>
          <Button type="submit" sx={styles.search}>
            {t('users.button.search')}
          </Button>
        </form>
      </FormProvider>
    </TemplatePaper>
  )
}
