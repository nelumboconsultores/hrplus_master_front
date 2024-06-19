import { useCallback, useEffect, useState } from 'react'
import { UsersContext } from '../context'
import { DynamicFormValues, ItemsSelectType, generateQueryParams } from 'core'
import { DataUserTable, ErrorTableType } from '../types'
import { SelectedOptionEnum } from '../components/enum/selecteOptionEnum'
import { getGroupNames, getProfiles } from 'core/services'
import { GenderEnum } from '../components/enum/genderEnum'

export const UsersProvider = ({ children }: { children: React.ReactElement }) => {
  const [view, setView] = useState<boolean>(false)
  const [initVal, setInitVal] = useState<DynamicFormValues>({})
  const [isLoad, setIsLoad] = useState(false)
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [rows, setRows] = useState<DataUserTable[]>([])
  const [rowsError, setRowsError] = useState<ErrorTableType>([])
  const [selectedOption, setSelectedOption] = useState<string>(SelectedOptionEnum.None)
  const [checkAll, setCheckAll] = useState<boolean>(false) // se ppne ture o false al oprimir todos
  const [profileIds, setProfileIds] = useState<number[]>([]) // el array los item selecioando d ela tabla
  const [excludeProfileIds, setExcludeProfileIds] = useState<number[]>([]) // estados de los que se van deselecionando cuando todos estan marcados
  const [listGroups, setListGroups] = useState<ItemsSelectType[]>([])

  const getDataTable = useCallback(
    async (
      page?: number,
      pageSize?: number,
      name?: string | null,
      sort?: string | null,
      search?: string,
      groupsIds?: number[],
    ) => {
      setIsLoad(true)
      const body = {
        size: pageSize,
        page: page,
        search: search ?? initVal?.search ?? '',
        groupIds: groupsIds ?? initVal?.groupIds,
        name,
        sort,
      }
      const queryParams = generateQueryParams(body)
      const response = await getProfiles(queryParams)

      if (response.data) {
        const newsRows = response?.data?.data?.content.map((item) => {
          const journey = item?.workPeriod?.map((item_) => item_?.name).join(', ')
          const group = item?.groups?.map((item_) => item_?.name).join(', ')
          return {
            check: false,
            id: item?.id,
            name: item?.fullName ?? '',
            sex: item?.gender ? GenderEnum[item?.gender] : '',
            position: item?.orgProfileAccess?.organigrama?.name ?? '',
            journey: journey ?? '',
            groups: group,
          }
        })

        setSizeTable(response.data.data.totalElements)
        setIsLoad(false)

        setRows(newsRows ?? [])
      }
      if (response.error) {
        setIsLoad(false)
      }
    },
    [initVal],
  )

  const idListSave = (id: number) => {
    if (checkAll) {
      if (excludeProfileIds.includes(id)) {
        setExcludeProfileIds([...excludeProfileIds.filter((item) => item !== id)])
        setProfileIds([...profileIds, id])
      } else {
        setExcludeProfileIds([...excludeProfileIds, id])
        setProfileIds([...profileIds.filter((item) => item !== id)])
      }
    } else {
      if (profileIds.includes(id)) setProfileIds([...profileIds.filter((item) => item !== id)])
      else setProfileIds([...profileIds, id])
    }
  }

  const getListGroups = useCallback(async () => {
    const response = await getGroupNames()
    if (response?.data) {
      const newsRows = response?.data?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        }
      })
      setListGroups(newsRows ?? [])
    }
  }, [])

  useEffect(() => {
    if (checkAll) {
      const itemsFilters = rows.filter((item) => !excludeProfileIds.includes(item.id))
      const ids = itemsFilters.map((item) => item.id)
      setProfileIds(ids)
    }
    if (listGroups.length === 0) getListGroups()
  }, [rows]) // eslint-disable-line

  return (
    <UsersContext.Provider
      value={{
        view,
        setView,
        initVal,
        setInitVal,
        isLoad,
        setIsLoad,
        sizeTable,
        setSizeTable,
        rows,
        setRows,
        selectedOption,
        setSelectedOption,
        getDataTable,
        rowsError,
        setRowsError,
        checkAll,
        setCheckAll,
        idListSave,
        profileIds,
        setProfileIds,
        excludeProfileIds,
        setExcludeProfileIds,
        listGroups,
        setListGroups,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
