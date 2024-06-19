import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { UserListBasic } from '../../components/userListBasic'
import { AppContext, DynamicFormValues, PathName, Variant, generateQueryParams, icons } from 'core'
import { FilterDrawer } from '../../components/filterDrawer'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getProfiles } from 'core/services'
import { GenderEnumOther } from 'modules/users/components/enum/genderEnum'
import { DataUserTable } from 'modules/eventAndCalendar/types/dataUserTable'
import { EventConfigurationContext } from '../../context'
import { assignmentsEvent, getAssignmentsEvent } from 'modules/eventAndCalendar/service/event-types'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { errorCodes } from 'core/locale/es/errorCodes'

export const Guests: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [initVal, setInitVal] = useState<DynamicFormValues>({})
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [rows, setRows] = useState<DataUserTable[]>([])
  const [excludeProfileIds, setExcludeProfileIds] = useState<number[]>([])
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [profileIds, setProfileIds] = useState<number[]>([])
  const [delProfileIds, setDelProfileIds] = useState<number[]>([])
  const [initialProfileIds, setInitialProfileIds] = useState<number[]>([])
  const { eventCongReducer } = useContext(EventConfigurationContext)
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const { idEvent } = eventCongReducer

  const handleToggleFilterDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (idEvent) {
      getDataTableInicial()
    }
  }, [idEvent]) // eslint-disable-line

  const getDataTableInicial = async () => {
    setIsLoad(true)
    if (idEvent) {
      const response = await getAssignmentsEvent(idEvent)

      if (response.data) {
        const profileResponses = response?.data?.data?.profileResponses ?? []
        const assignedProfileIds = profileResponses.map((item) => item.id)

        const newsRows = profileResponses.map((item) => ({
          check: true,
          id: item?.id ?? 'N/A',
          idOrig: item?.usernameCode ?? 'N/A',
          firstName: item?.firstName ? item?.firstName + ' ' + (item?.middleName ?? '') : 'N/A',
          lastName: item?.lastName ? item?.lastName + ' ' + (item?.maidenName ?? '') : 'N/A',
          sex: item?.gender ? GenderEnumOther[item?.gender] : 'N/A',
          rol: item?.rol ?? 'N/A',
          email: item?.email && item?.email !== '' ? item?.email : 'N/A',
          position: item?.position ?? 'N/A',
          branch: item?.branch ?? 'N/A',
        }))

        setProfileIds(assignedProfileIds)
        setInitialProfileIds(assignedProfileIds)
        setSizeTable(profileResponses.length)
        setRows(newsRows)
        setIsLoad(false)
        setOpen(profileResponses.length > 0 ? false : true)
      }

      if (response.error) {
        setIsLoad(false)
      }
    }
  }

  const getDataTable = useCallback(
    async (
      page?: number,
      pageSize?: number,
      name?: string | null,
      sort?: string | null,
      search?: string,
      statusId?: number,
      costCenterId?: number,
      groupsIds?: number[],
      workPositionId?: number,
      geographyStructIds?: number[],
    ) => {
      setIsLoad(true)
      const body = {
        size: pageSize,
        page: page,
        statusId: statusId,
        search: search,
        groupIds: groupsIds,
        geographyStructIds: geographyStructIds,
        costCenterId: costCenterId,
        workPositionId: workPositionId,
        name,
        sort,
      }
      const queryParams = generateQueryParams(body)
      const response = await getProfiles(queryParams)

      if (response.data) {
        const newsRows = response?.data?.data?.content.map((item) => ({
          check: profileIds?.includes(item.id),
          id: item?.id ?? 'N/A',
          idOrig: item?.usernameCode ?? 'N/A',
          firstName: item?.firstName ? item?.firstName + ' ' + (item?.middleName ?? '') : 'N/A',
          lastName: item?.lastName ? item?.lastName + ' ' + (item?.maidenName ?? '') : 'N/A',
          sex: item?.gender ? GenderEnumOther[item?.gender] : 'N/A',
          rol: item?.rol ?? 'N/A',
          email: item?.email && item?.email !== '' ? item?.email : 'N/A',
          position: item?.workPosition?.denomination ?? 'N/A',
          branch: item?.workPosition?.costCenter?.denomination ?? 'N/A',
        }))

        setSizeTable(response.data.data.totalElements)
        setRows(newsRows)
        setIsLoad(false)
        setOpen(false)
      }

      if (response.error) {
        setIsLoad(false)
      }
    },
    [profileIds],
  )

  const finish = async () => {
    setIsLoad(true)
    const body = { profileIds, delProfileIds, serie: false }
    const response = await assignmentsEvent(idEvent ?? 0, body)

    if (response.data) {
      setActMessage({
        type: Variant.success,
        message:
          profileIds?.length > 1
            ? t('eventAndCalendar.success.guests')
            : t('eventAndCalendar.success.guest'),
      })
      navigate(PathName.EventsAndCalendar)
    }

    if (response.error) {
      if (response.error?.errors?.code) {
        const errorCode = errorCodes[(response.error?.errors.code ?? '') as keyof typeof errorCodes]
        setActMessage({
          message: errorCode,
          type: Variant.error,
        })
      } else {
        setActMessage({
          message: t('general.validations.errorService'),
          type: Variant.error,
        })
      }
    }
    setIsLoad(false)
  }

  const idListSave = (id: number) => {
    if (checkAll) {
      if (excludeProfileIds?.includes(id)) {
        setExcludeProfileIds(excludeProfileIds?.filter((item) => item !== id))
        setProfileIds([...profileIds, id])
        if (initialProfileIds?.includes(id)) {
          setDelProfileIds(delProfileIds?.filter((item) => item !== id))
        }
      } else {
        setExcludeProfileIds([...excludeProfileIds, id])
        setProfileIds(profileIds?.filter((item) => item !== id))
        if (initialProfileIds?.includes(id)) {
          setDelProfileIds([...delProfileIds, id])
        }
      }
    } else {
      if (profileIds?.includes(id)) {
        setProfileIds(profileIds?.filter((item) => item !== id))
        if (initialProfileIds?.includes(id)) {
          setDelProfileIds([...delProfileIds, id])
        }
      } else {
        setProfileIds([...profileIds, id])
        setDelProfileIds(delProfileIds?.filter((item) => item !== id))
      }
    }
  }

  return (
    <Box>
      <Box sx={{ textAlign: 'end' }}>
        <Tooltip title={'Filtros'}>
          <IconButton
            sx={{
              svg: {
                fontSize: '1.8rem',
                color: '#24A9E2',
              },
            }}
            onClick={handleToggleFilterDrawer}
          >
            {icons.TuneOutlined}
          </IconButton>
        </Tooltip>
      </Box>
      <UserListBasic
        isLoad={isLoad}
        sizeTable={sizeTable}
        rows={rows}
        getDataTable={getDataTable}
        checkAll={checkAll}
        setCheckAll={setCheckAll}
        profileIds={profileIds}
        setProfileIds={setProfileIds}
        idListSave={idListSave}
      />
      <Box sx={{ textAlign: 'right', padding: '12px 0px' }}>
        <Tooltip title={profileIds?.length === 0 ? t('users.tooltip') : ''}>
          <span>
            <Button
              type="submit"
              color="secondary"
              onClick={finish}
              disabled={isLoad || profileIds?.length === 0}
            >
              {t('general.button.save')}
            </Button>
          </span>
        </Tooltip>
      </Box>
      <FilterDrawer
        open={open}
        onClose={handleToggleFilterDrawer}
        getDataTable={getDataTable}
        initVal={initVal}
        setInitVal={setInitVal}
      />
    </Box>
  )
}
