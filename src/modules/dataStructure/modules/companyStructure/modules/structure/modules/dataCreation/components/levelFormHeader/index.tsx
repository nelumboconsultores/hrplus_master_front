import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { InputName } from '../inputName'

export const LevelFormHeader: React.FC = () => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ maxWidth: '440px' }}>
      <Box sx={{ marginBottom: '16px', marginTop: '8px', width: '300px' }}>
        <InputName
          {...register('name')}
          label={t('operatingLevel.input.newLevelEntity')}
          error={!!errors?.name}
          helperText={errors?.name?.message as string}
        />
      </Box>
    </Box>
  )
}
