import { Box, Grid, Typography } from '@mui/material'
import { BreadCrumbsList, GeneralTitle } from 'core'
import { styles } from './detailPageSyles'
import { useEffect, useState } from 'react'
import { getCatalogueById } from 'core/services/incidents'
import { useParams } from 'react-router-dom'
import { KeyComponent } from 'modules/incidents/components/keyComponents'
import { Data, DataCard } from 'modules/incidents/types'
import { useTranslation } from 'react-i18next'
import { CardGallery } from 'modules/incidents/components'
import { KeyEnum } from 'modules/incidents/enum/keyEnum'
import { customOrder } from 'modules/incidents/enum/customOrder'
import { CheckboxList, valuesList } from 'modules/incidents/enum/cardValues'
import { evidenceConfiguration } from 'modules/incidents/enum/evidenceConfiguration'
import Spinner from 'core/components/spinner'

type KeyOfData = keyof Data
interface EvidenceTypeConfig {
  id: number | null
  switchIsRequired: boolean
  amounts: number | null
  sizes: number | null
  types: string[] | null
}

const DetailPage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [acronym, setAcronym] = useState('')
  const { id } = useParams()
  const [arrayKey, setArrayKey] = useState<string[]>([])
  const [dataComponents, setDataComponents] = useState<Data>()
  const [succes, setSucces] = useState(false)
  const { t } = useTranslation()
  const [dataCards, setDataCards] = useState<DataCard[]>([])

  useEffect(() => {
    obtDetail()
  }, []) //eslint-disable-line

  const obtDetail = async () => {
    setSucces(true)
    const { data: resp } = await getCatalogueById(Number(id))

    if (resp) {
      setTitle(resp.data.name)
      setAcronym(resp.data.acronym)

      const keys = Object.keys(resp.data).sort((a, b) => {
        const indexA = customOrder.indexOf(a as KeyEnum)
        const indexB = customOrder.indexOf(b as KeyEnum)

        if (indexA === -1) return 1
        if (indexB === -1) return -1

        return indexA - indexB
      })

      setArrayKey(keys)

      setDataComponents({
        ...resp.data,
        date: resp.data.required_date_range
          ? t('incidents.detail.dateRange')
          : t('incidents.detail.singleDate'),
      })

      const configByEvidenceTypeKey: { [key: string]: EvidenceTypeConfig } = {}

      evidenceConfiguration.forEach((value) => {
        const evidenceTypeKey = value.evidenceType?.key
        if (evidenceTypeKey) {
          configByEvidenceTypeKey[evidenceTypeKey] = {
            id: null,
            switchIsRequired: false,
            amounts: null,
            sizes: 0,
            types: null,
          }
        }
      })

      resp.data.configEvidences.forEach((value) => {
        const id = value.id
        const evidenceTypeKey = value.evidenceType?.key
        if (evidenceTypeKey) {
          configByEvidenceTypeKey[evidenceTypeKey].switchIsRequired = true
          configByEvidenceTypeKey[evidenceTypeKey].id = id

          configByEvidenceTypeKey[evidenceTypeKey].amounts = value.config.amounts || null
          configByEvidenceTypeKey[evidenceTypeKey].sizes = value.config.sizes || 0
          configByEvidenceTypeKey[evidenceTypeKey].types = value.config.types || null
        }
      })

      const processedData: DataCard[] = evidenceConfiguration.map((value) => {
        const evidenceTypeKey = value.evidenceType?.key || ''
        const config = configByEvidenceTypeKey[evidenceTypeKey]
        const description = value.evidenceType?.description || ''

        let foundList: { [key: string]: { label: string; value: number; id: string }[] } | undefined
        let selectedList: { label: string; value: number; id: string }[] = []
        let foundCheckboxList: { [key: string]: { name: string }[] } | undefined
        let checkboxesForType: { name: string; checked: boolean }[] = []

        const foundListCandidate = valuesList.find((item) => evidenceTypeKey in item)
        if (foundListCandidate !== undefined) {
          foundList = foundListCandidate as unknown as {
            [key: string]: { label: string; value: number; id: string }[]
          }
          if (evidenceTypeKey in foundList) {
            selectedList = foundList[evidenceTypeKey]
          }
        }

        const foundCheckboxListCandidate = CheckboxList.find((item) => evidenceTypeKey in item)
        if (foundCheckboxListCandidate !== undefined) {
          foundCheckboxList = foundCheckboxListCandidate as unknown as {
            [key: string]: { name: string }[]
          }

          if (evidenceTypeKey in foundCheckboxList) {
            const expectedTypes = foundCheckboxList[evidenceTypeKey].map(
              (checkbox) => checkbox.name,
            )

            checkboxesForType = expectedTypes.map((type) => ({
              name: type,
              checked: config?.types?.includes(type) || false,
            }))
          }
        }

        return {
          ...value,
          id: config?.id ?? null,
          label: description,
          switchIsRequired: config?.switchIsRequired || false,
          isRequired: value.required || false,
          sizes: config?.sizes !== null ? config.sizes : null,
          amounts: config?.amounts !== null ? config.amounts : null,
          lists: selectedList,
          checkboxes: checkboxesForType,
          textHelp: value?.textHelp || '',
          evidenceType: value?.evidenceType?.id,
          solicitationCatalogId: resp?.data?.id,
        } as DataCard
      })
      setDataCards(processedData)
    }
    setSucces(false)
  }

  return (
    <Box>
      <BreadCrumbsList />
      {succes ? (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      ) : (
        <Grid container sx={styles.container}>
          <Grid item xs={6} md={12} lg={6.3} xl={7} sx={styles.padrig}>
            <GeneralTitle sx={styles.title}>
              {title}
              {' (' + acronym + ')'}
            </GeneralTitle>
            <Grid container spacing={2}>
              {Object.values(arrayKey).map((item, index) => {
                if (
                  item === 'manageActions' &&
                  dataComponents &&
                  dataComponents[item]?.length > 0
                ) {
                  return <KeyComponent key={index} variant={item} data={dataComponents} />
                } else if (
                  item !== 'manageActions' &&
                  dataComponents &&
                  dataComponents[item as KeyOfData] !== null
                ) {
                  return <KeyComponent key={index} variant={item} data={dataComponents} />
                }
              })}
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            md={12}
            lg={5}
            xl={4}
            /*   sx={{
              '& .cardPaper': {
                marginBottom: '20px',
              },
              padding:"0px 10px",
              maxHeight: '80vh',
              overflowY: 'auto',
            }} */
          >
            <Typography sx={styles.config}>{t('incidents.title.configuration')}</Typography>
            <Grid item sx={{ padding: '0px 10px', maxHeight: '80vh', overflowY: 'auto' }}>
              {dataCards.map((value, index) => {
                return (
                  <Box sx={{ padding: '10px 0px' }}>
                    <CardGallery key={index} value={value} />
                  </Box>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default DetailPage
