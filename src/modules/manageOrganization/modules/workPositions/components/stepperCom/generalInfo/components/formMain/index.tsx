import { Grid } from '@mui/material'
import { GeneralAccordion, ReturnInput } from 'core'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { WorkPositionsContext } from 'modules/manageOrganization/modules/workPositions/context'
import { getGenInfoFieldsResponse } from 'core/services'

type FormMainProps = { fieldsData: getGenInfoFieldsResponse | null }

export const FormMain: React.FC<FormMainProps> = (/* { setIsLoaded } */) => {
  const { t } = useTranslation()
  const { jsonFields } = useContext(WorkPositionsContext)

  return (
    <GeneralAccordion
      title={t(`instancesWorkPositions.creation.title.generalInformation`)}
      props={{
        accordionProps: {
          defaultExpanded: true,
          sx: { width: '100%' },
        },
      }}
    >
      <Grid container spacing={2}>
        {jsonFields?.map((item, index) => <ReturnInput field={item} key={index} />)}
      </Grid>
    </GeneralAccordion>
  )
}
