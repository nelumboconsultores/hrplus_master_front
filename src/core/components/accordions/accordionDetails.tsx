import { icons } from 'core'
import { GeneralAccordion } from '.'
import { useTranslation } from 'react-i18next'
import { Box, ListItemIcon } from '@mui/material'

type AccordionDetailsProps = {
  children: React.ReactNode
  title: string
  hiddenIcon?: boolean
  edit?: () => void
  hiddenCheckIcon?: boolean
  complete?: boolean
}

export const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  children,
  title,
  hiddenIcon,
  edit,
  hiddenCheckIcon,
  complete,
}) => {
  const { t } = useTranslation()

  return (
    <GeneralAccordion
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!hiddenCheckIcon && (
            <Box sx={{ marginTop: 1, marginLeft: 1 }}>
              <ListItemIcon sx={{ color: complete ? '#31c462' : '#9195b0', minWidth: '48px' }}>
                {complete ? icons.CheckCircle : icons.WatchLaterOutlined}
              </ListItemIcon>
            </Box>
          )}
          <Box sx={{ color: '#686868' }}>{title}</Box>
        </Box>
      }
      props={{
        accordionProps: {
          defaultExpanded: false,
          sx: { width: '100%' },
        },
        iconExtraProps: {
          color: 'secondary',
          onClick: (e) => {
            if (hiddenIcon) return
            e.stopPropagation()
            if (edit) edit()
          },
        },
      }}
      iconTooltip={t('general.toolTip.edit')}
      iconExtra={hiddenIcon ? <></> : icons.edit}
    >
      {children}
    </GeneralAccordion>
  )
}
