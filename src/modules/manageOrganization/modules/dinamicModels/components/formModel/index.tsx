import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { HeaderForm } from '..'
import { ReturnStep } from './returnStep'
import { ButtonBack } from 'modules/manageOrganization/components'
import { ModelContext } from '../../context'
import { ActionTypes } from '../../enums'

export const FormModel: React.FC = () => {
  const { modelState, modelDispatch } = useContext(ModelContext)
  const navigate = useNavigate()

  const toBack = () => {
    if (modelState?.step && modelState?.step > 0) {
      modelDispatch({ type: ActionTypes.SET_STEP, payload: modelState.step - 1 })
    } else navigate(-1)
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
      <Box>
        <Box>
          <ButtonBack
            click={toBack}
            sx={{ position: 'inherit', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </Box>
        <HeaderForm />
      </Box>
      <ReturnStep />
    </Box>
  )
}
