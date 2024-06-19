import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { HeaderForm } from '..'
import { ReturnStep } from './returnStep'
import { ButtonBack } from 'modules/manageOrganization/components'
import { WorkPositionsContext } from '../../context'
import { ActionTypes } from '../../enums'

export const FormModel: React.FC = () => {
  const { modelState, modelDispatch } = useContext(WorkPositionsContext)
  const navigate = useNavigate()

  const toBack = () => {
    if (modelState?.step && modelState?.step > 0) {
      modelDispatch({ type: ActionTypes.SET_STEP, payload: modelState.step - 1 })
    } else navigate(-1)
  }
  return (
    <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ marginBottom: '12px' }}>
        <ButtonBack
          click={toBack}
          sx={{ position: 'inherit', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </Box>
      <HeaderForm />
      <ReturnStep />
    </Box>
  )
}
