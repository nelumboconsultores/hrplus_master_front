import { useContext } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { HeaderForm } from '..'
import { ReturnStep } from './returnStep'
import { ModelContext } from '../../context'
import { ActionTypes } from '../../enums'
import { ButtonBack } from 'core'

export const FormModel: React.FC = () => {
  const { modelState, modelDispatch } = useContext(ModelContext)
  const navigate = useNavigate()

  const toBack = () => {
    if (modelState?.step && modelState?.step > 0) {
      modelDispatch({ type: ActionTypes.SET_STEP, payload: modelState.step - 1 })
    } else navigate(-1)
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ marginBottom: '12px' }}>
        <ButtonBack click={toBack} />
      </Box>
      <HeaderForm />
      <ReturnStep />
    </Box>
  )
}
