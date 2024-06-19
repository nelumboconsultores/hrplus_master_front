import { useParams } from 'react-router-dom'
import { FormModel } from '../../components'
import { useContext, useEffect } from 'react'
import { WorkPositionsContext } from '../../context'
import { ActionTypes } from '../../enums'

export const EditionModel: React.FC = () => {
  const { id } = useParams()
  const { modelDispatch, modelState } = useContext(WorkPositionsContext)
  useEffect(() => {
    if (id && !modelState.id) modelDispatch({ type: ActionTypes.SET_ID, payload: Number(id) })
  }, [id]) // eslint-disable-line
  return <FormModel />
}
