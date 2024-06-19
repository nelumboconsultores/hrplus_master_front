import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { CapitalIconButton } from 'core'
import { LinkedinIcon, FacebookIcon } from 'core/assets'
import { TitleAndStatus } from './titleAndStatus'
import { NamesAndButtons } from './namesAndButtons'
import { AvatarSelector } from './avatarSelector'
import { ValueAndLabel } from './valueAndLabel'
import { RoleAndBranch } from './roleAndBranch'
import { styles } from './styles'
import { useContext, useMemo, useState } from 'react'
import { ProfileDetailContext } from 'modules/contributors/context'
import { t } from 'i18next'
import { patchProfileActivation } from 'modules/contributors/services/profiles'
import { AppContext, BaseModal, Variant } from 'core'
import { StatusUsers } from 'modules/contributors/enums/statusUsers'
import { dateToSpanish } from 'core/utils/textFormat'
import Insta from 'core/assets/instagram.png'

export const InformativeCard: React.FC = () => {
  const { setActMessage } = useContext(AppContext)
  const { profile, loadProfile, sections } = useContext(ProfileDetailContext)
  const newDate = profile?.hiredDate ? dateToSpanish(profile.hiredDate) : '-'
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleUpdate = () => {
    setOpen(false)
  }

  const { facebook, linkedIn, instagram } = useMemo(() => {
    const contactSection = sections.find(
      (section) => section.profileSection.name === 'personal_information',
    )
    return {
      facebook: contactSection?.fieldsValues?.['Facebook'],
      linkedIn: contactSection?.fieldsValues?.['LinkedIn'],
      instagram: contactSection?.fieldsValues?.['Instagram'],
    }
  }, [sections])

  const changeStatus = async () => {
    setLoading(true)
    const response = await patchProfileActivation(profile.id)
    if (response.data) {
      setActMessage({
        message: t('contributors.detail.activateSuccess'),
        type: Variant.success,
      })
      await loadProfile()
    }
    if (response.error) {
      setActMessage({
        message: t('contributors.detail.activateError'),
        type: Variant.error,
        code: response.error?.errors.code,
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Paper elevation={3} sx={styles.root}>
      <TitleAndStatus />
      <NamesAndButtons />
      <Box position="relative">
        <Grid container position="absolute" width="75px">
          {facebook && (
            <Grid item xs={6}>
              <CapitalIconButton
                title="Perfil de Facebook"
                component="a"
                href={facebook as string}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </CapitalIconButton>
            </Grid>
          )}
          {linkedIn && (
            <Grid item xs={6}>
              <CapitalIconButton
                title="Perfil de Linkedin"
                component="a"
                href={linkedIn as string}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
              </CapitalIconButton>
            </Grid>
          )}
          {instagram && (
            <Grid item xs={6}>
              <CapitalIconButton
                title="Perfil de Instagram"
                component="a"
                href={instagram as string}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Insta} alt="Instagram" width={20.425} />
              </CapitalIconButton>
            </Grid>
          )}
        </Grid>
        <AvatarSelector />
      </Box>

      <RoleAndBranch />

      <Divider sx={styles.divider} />
      <Box sx={{ display: 'flex' }}>
        <Box flex={1} padding="16px 0">
          <ValueAndLabel
            value={profile?.usernameCode ?? 'N/A'}
            label={t('contributors.detail.id')}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1} padding="16px 0">
          <ValueAndLabel value={newDate} label={t('contributors.detail.date')} />
        </Box>
      </Box>
      <Divider sx={styles.divider} />
      <Box padding="16px 0">
        <ValueAndLabel value="N/A" label={t('contributors.detail.manager')} />
      </Box>
      <Divider sx={styles.divider} />
      <Box padding="16px 0">
        <ValueAndLabel value="N/A" label={t('contributors.detail.coordinator')} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        {profile.profileStatus.id !== StatusUsers.active && (
          <Button onClick={() => setOpen(true)} sx={styles.activate} disabled={loading}>
            {t('contributors.detail.toRegister')}
          </Button>
        )}

        {/*   <Button sx={styles.update} onClick={loadProfile}>
          {t('contributors.detail.update')}
        </Button> */}
        <BaseModal open={open} onClose={handleUpdate} width={580}>
          <Box sx={styles.modal}>
            <Typography sx={styles.titleModal}>{t('contributors.modal.title')}</Typography>
            <Typography sx={{ marginBottom: 1 }}>{t('contributors.modal.subTitle')}</Typography>
            <Box sx={styles.btnModal}>
              <Button variant="text" onClick={handleUpdate} sx={styles.btnCancel}>
                {t('contributors.modal.cancel')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={changeStatus}
                disabled={loading}
                sx={styles.btnSave}
              >
                {t('contributors.modal.save')}
              </Button>
            </Box>
          </Box>
        </BaseModal>
      </Box>
    </Paper>
  )
}
