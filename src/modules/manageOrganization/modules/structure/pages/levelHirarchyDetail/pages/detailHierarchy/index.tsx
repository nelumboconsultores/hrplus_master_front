import { Box, Typography } from '@mui/material'
import { FontName, Tree, generateQueryParams } from 'core'
import { TreeItem } from 'core/components/tree/types'
import { getNestedEntityHerarchyLevels } from 'core/services'
import React, { useLayoutEffect } from 'react'
import Spinner from 'core/components/spinner'
import { transformResponseToTreeItem } from './methods'
import { DetailNestedDetail } from '../../components/detailNestedCard'
import { useNavigate, useParams } from 'react-router-dom'
import { ButtonBack } from 'modules/manageOrganization/components'

const ViewTypeEnum = {
  GEOGRAPHICAL: 1,
  ORGANIZATIONAL: 2,
}
const DetailHierarchy = () => {
  const { id, '*': parentId } = useParams()
  const [loading, setLoading] = React.useState({ main: false })
  const [childrens, setChildrens] = React.useState<TreeItem>({})
  const navigate = useNavigate()
  const getData = React.useCallback(async () => {
    setLoading((prev) => ({ ...prev, main: true }))
    const params = generateQueryParams({ parentId })

    const response = await getNestedEntityHerarchyLevels({ id: id ?? '1' }, params)
    const transformedData = transformResponseToTreeItem({ response: response.data?.data ?? [] })

    setChildrens(transformedData[0])
    setLoading((prev) => ({ ...prev, main: false }))
  }, [id, parentId])

  useLayoutEffect(() => {
    getData()
  }, [getData])

  if (loading.main) return <Spinner />
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Box sx={{ position: 'relative', top: '28px' }}>
        <ButtonBack click={() => navigate(-1)} />
      </Box>

      <Box sx={{ textAlign: 'end' }}>
        <Typography
          sx={{
            fontSize: '1rem',
            fontFamily: FontName.RobotoMedium,
            color: '#24A9E2',
            padding: '0px 0px 20px',
          }}
        >
          {Number(id) === ViewTypeEnum.GEOGRAPHICAL
            ? 'Vista Jerarquica de la Estructura Geográfica'
            : 'Vista Jerarquica de la Estructura Organizativa'}
        </Typography>
      </Box>
      <Tree
        {...childrens}
        readonly
        cardModel={(payload) => {
          return <DetailNestedDetail {...payload} />
        }}
      />
    </Box>
  )
}

export { DetailHierarchy }
