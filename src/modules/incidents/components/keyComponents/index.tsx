import { KeyEnum } from '../../enum/keyEnum'
import { TextBlock, TextBlockRed, TextCatalogue, TextLink, TextRecord } from '..'
import { Grid } from '@mui/material'
import { Data } from 'modules/incidents/types'
import { useTranslation } from 'react-i18next'

type KeyComponentProps = {
  variant: string
  data: Data
}

export const KeyComponent: React.FC<KeyComponentProps> = ({ variant, data }) => {
  const { t } = useTranslation()
  switch (variant) {
    case KeyEnum.NamePublic:
      return (
        <Grid item xs={12}>
          <TextBlock
            title={t('incidents.detail.namePublic')}
            description={data.namePublic}
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.Description:
      return (
        <Grid item xs={12}>
          <TextBlock
            title={t('incidents.detail.description')}
            description={data.description}
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.Delegate:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.delegate')}
            description={
              data.delegate ? t('incidents.detail.permitted') : t('incidents.detail.notAllowed')
            }
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.Comments:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.comments')}
            description={
              data.comments ? t('incidents.detail.enabled') : t('incidents.detail.enabled')
            }
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.FolioNumber:
      return (
        <Grid item xs={12}>
          <TextBlockRed
            title={t('incidents.detail.folioNumber')}
            description={
              data.folioNumber ? t('incidents.detail.enabled') : t('incidents.detail.enabled')
            }
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.RequestDate:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.requestDate')}
            description={
              data.requestDate ? t('incidents.detail.dateRange') : t('incidents.detail.singleDate')
            }
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.RegisterTime:
      return (
        <Grid item xs={12}>
          <TextBlockRed
            title={t('incidents.detail.registerTime')}
            description={
              data.registerTime ? t('incidents.detail.required') : t('incidents.detail.notRequired')
            }
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.RequestEffectiveDate:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.requestEffectiveDate')}
            description={
              data.requestEffectiveDate
                ? t('incidents.detail.required')
                : t('incidents.detail.notRequired')
            }
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.CalculateDateEnd:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.calculateDateEnd')}
            description={
              data.calculateDateEnd ? t('incidents.detail.enabled') : t('incidents.detail.enabled')
            }
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.St2File:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.st2File')}
            description={
              data.st2File ? t('incidents.detail.required') : t('incidents.detail.notRequired')
            }
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.St7File:
      return (
        <Grid item xs={6}>
          <TextBlockRed
            title={t('incidents.detail.st7File')}
            description={
              data.st7File ? t('incidents.detail.required') : t('incidents.detail.notRequired')
            }
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.InsuranceType:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.insuranceType')}
            keys={KeyEnum.InsuranceType}
            url={'insurance-type'}
            urlType={'relationships'}
            solicitationCatalogid={data.id}
            column={'insurance_type_id'}
            options={data.insuranceType}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.EffectSalaryType:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.effectSalaryType')}
            keys={KeyEnum.EffectSalaryType}
            url={'effect-salary-type'}
            urlType={'relationships'}
            solicitationCatalogid={data.id}
            column={'effect_salary_type_id'}
            options={data.effectSalaryType}
            textRecordData={[]}
          />
        </Grid>
      )

    case KeyEnum.IncapacityType:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.incapacityType')}
            keys={KeyEnum.IncapacityType}
            url={'incapacity-type'}
            urlType={'relationships'}
            solicitationCatalogid={data.id}
            column={'incapacity_type_id'}
            options={data.incapacityType}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.OccupationalRiskType:
      return (
        <>
          <Grid item xs={6}>
            <TextCatalogue
              title={t('incidents.detail.occupationalRiskType')}
              keys={KeyEnum.OccupationalRiskType}
              url={'occupational-risk-type'}
              urlType={'relationships'}
              solicitationCatalogid={data.id}
              column={'occupational_risk_type_id'}
              options={data.occupationalRiskType}
              textRecordData={[]}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </>
      )
    case KeyEnum.JustificationCatalog:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.justificationCatalog')}
            keys={KeyEnum.JustificationCatalog}
            url={'catalogues/names'}
            urlType={'catalogue-reasons'}
            solicitationCatalogid={data.id}
            column={'justification_catalog_id'}
            options={data.justificationCatalog}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.MaxTimeJustification:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.maxTimeJustification')}
            keys={KeyEnum.MaxTimeJustification}
            url={'max-time-justification'}
            urlType={'relationships'}
            solicitationCatalogid={data.id}
            column={'max_time_justification_id'}
            options={data.maxTimeJustification}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.ActivateTimeOmission:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.activateTimeOmission')}
            keys={KeyEnum.ActivateTimeOmission}
            url={'active-time-omission'}
            urlType={'relationships'}
            solicitationCatalogid={data.id}
            column={'activate_time_omission_id'}
            options={data.activateTimeOmission}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.OmissionCatalog:
      return (
        <Grid item xs={6}>
          <TextCatalogue
            title={t('incidents.detail.omissionCatalog')}
            keys={KeyEnum.OmissionCatalog}
            url={'catalogues/names'}
            solicitationCatalogid={data.id}
            column={'omission_catalog_id'}
            urlType={'catalogue-reasons'}
            options={data.omissionCatalog}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.ManageActions:
      return (
        <Grid item xs={12}>
          <TextRecord
            title={t('incidents.detail.manageActions')}
            textRecordData={data.manageActions}
          />
        </Grid>
      )
    case KeyEnum.PolicyFile:
      return (
        <Grid item xs={6}>
          <TextLink
            title={t('incidents.detail.policyFile')}
            description={data.policyFile}
            textRecordData={[]}
          />
        </Grid>
      )
    case KeyEnum.HelpFile:
      return (
        <Grid item xs={6}>
          <TextLink
            title={t('incidents.detail.helpFile')}
            description={data.helpFile}
            textRecordData={[]}
          />
        </Grid>
      )

    default:
      return <></>
  }
}
