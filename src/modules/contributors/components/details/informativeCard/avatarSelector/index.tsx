import { Avatar, Box, CircularProgress, Fade } from '@mui/material'
import { CameraAltOutlined } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { styles } from './styles'
import { useAWS } from 'core/hooks'
import { updateImageProfile } from 'modules/contributors/services/profiles'
import { useParams } from 'react-router-dom'
import { ProfileDetailContext } from 'modules/contributors/context'

const FadeIcon: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <Fade in={show} timeout={300} unmountOnExit>
      <CameraAltOutlined fontSize="large" sx={{ color: '#ffff' }} />
    </Fade>
  )
}

export const AvatarSelector: React.FC = () => {
  const { loadProfile, profile } = useContext(ProfileDetailContext)
  const { uploadObject, deleteObject } = useAWS()
  const { id } = useParams()
  const [hover, setHover] = useState(false)

  const deleteOldImage = async () => {
    if (!profile.imageUrl) return Promise.resolve()
    const key = profile.imageUrl.split('/').pop()
    return await deleteObject({ Key: key ?? '' })
  }

  const getFile = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files![0]
      const fileName = file.name
      await deleteOldImage()
      const url = await uploadObject({ Key: fileName, Body: file })
      const { data } = await updateImageProfile(id ?? '', { fileUrl: url ?? '' })
      if (data) await loadProfile()
    }
  }

  const initials = profile.firstName?.charAt(0) + profile.lastName?.charAt(0)

  return (
    <Box sx={styles.root}>
      <Box
        sx={styles.avatarContainer}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={getFile}
      >
        <Box sx={styles.iconContainer}>
          <FadeIcon show={hover} />
        </Box>
        <CircularProgress
          variant="determinate"
          value={profile.completedProfile}
          size={'173px'}
          thickness={1}
          sx={styles.progressBar}
        />
        <Avatar sx={styles.avatar} src={profile.imageUrl}>
          {initials}
        </Avatar>
      </Box>
    </Box>
  )
}
