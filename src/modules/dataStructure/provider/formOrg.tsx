import { CatalogType, ItemsSelectType, generateQueryParams } from 'core'
import { getCatalogueList } from 'core/services'
import React, { createContext, useEffect, useState } from 'react'

export const FormOrgContext = createContext<{
  catReasonsOptions: ItemsSelectType[]
  setCatReasonsOptions: React.Dispatch<React.SetStateAction<ItemsSelectType[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isDisabled: boolean
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
}>(Object({}))

export const FormOrgProvider = ({
  children,
  disable = false,
}: {
  children: React.ReactElement
  disable?: boolean
}) => {
  const [catReasonsOptions, setCatReasonsOptions] = useState<ItemsSelectType[]>([])
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(disable)

  const getOptions = async () => {
    const body = {
      catalogueTypeId: CatalogType.List,
    }
    const queryParams = generateQueryParams(body)
    const options = await getCatalogueList(queryParams)
    const newData = options?.data?.data?.map((option) => {
      return {
        value: option.id,
        label: option.name,
      }
    })
    setCatReasonsOptions(newData ?? [])
  }

  useEffect(() => {
    getOptions()
  }, [])
  useEffect(() => {
    setIsDisabled(disable)
  }, [disable])
  return (
    <FormOrgContext.Provider
      value={{
        catReasonsOptions,
        setCatReasonsOptions,
        loading,
        setLoading,
        isDisabled,
        setIsDisabled,
      }}
    >
      {children}
    </FormOrgContext.Provider>
  )
}
