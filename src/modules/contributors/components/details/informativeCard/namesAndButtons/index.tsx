import { useContext, useMemo } from 'react'
import { MailOutlineRounded, PhoneOutlined } from '@mui/icons-material'
import { CapitalIconButton, ProfileModulesIds, getAge } from 'core'
import { Box, Tooltip, Typography } from '@mui/material'
import { ProfileDetailContext } from 'modules/contributors/context'
import { styles } from './styles'
import { t } from 'i18next'

export const NamesAndButtons: React.FC = () => {
  const { profile, sections } = useContext(ProfileDetailContext)

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name
  }

  const age = useMemo(() => {
    const biographySection = sections.find(
      (section) => section.profileSection.id === ProfileModulesIds.BiographicalInformation,
    )
    const birthDate = biographySection?.fieldsValues?.['Fecha de nacimiento']
    return getAge(birthDate as string) ?? 0
  }, [sections])

  const email = useMemo(() => {
    const contactSection = sections.find(
      (section) => section.profileSection.id === ProfileModulesIds.ContactInformation,
    )
    return contactSection?.fieldsValues?.['Correo Electrónico']
  }, [sections])

  const phone = useMemo(() => {
    const contactSection = sections.find(
      (section) => section.profileSection.id === ProfileModulesIds.ContactInformation,
    )
    return contactSection?.fieldsValues?.['Número telefónico']
  }, [sections])

  return (
    <Box sx={styles.root}>
      <Tooltip
        title={`${profile.firstName ?? ''} ${profile.middleName ?? ''} ${profile.lastName ?? ''} ${
          profile.maidenName ?? ''
        }`}
      >
        <Box sx={{ maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Typography sx={styles.name}>
            {truncateName(`${profile.firstName ?? ''} ${profile.middleName ?? ''}`, 24)}
          </Typography>
          <Typography sx={styles.lastName}>
            {truncateName(`${profile.lastName ?? ''} ${profile.maidenName ?? ''}`, 28)}
          </Typography>
          <Typography sx={styles.age}>{`${age} años`}</Typography>
        </Box>
      </Tooltip>
      <Box display="flex" gap={1}>
        <CapitalIconButton
          title={t('contributors.detail.email')}
          sx={styles.mail}
          component={'a'}
          href={`mailto:${email}`}
        >
          <MailOutlineRounded />
        </CapitalIconButton>
        <CapitalIconButton title="Telefono" sx={styles.phone} component={'a'} href={`tel:${phone}`}>
          <PhoneOutlined />
        </CapitalIconButton>
      </Box>
    </Box>
  )
}
