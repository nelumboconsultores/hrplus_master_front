import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  IconButton,
  IconButtonProps,
  Tooltip,
} from '@mui/material'
import { FontName } from 'core'
import { colors } from 'core/styles/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'

type GeneralAccordionProps = {
  title: string | React.ReactNode
  children: React.ReactNode
  props?: {
    accordionProps?: Omit<AccordionProps, 'children'>
    iconExtraProps?: Omit<IconButtonProps, 'children'>
  }
  iconExtra?: React.ReactNode
  iconTooltip?: string
}

export const GeneralAccordion: React.FC<GeneralAccordionProps> = ({
  children,
  title,
  iconExtra,
  iconTooltip,
  props,
}) => {
  const styles = { backgroundColor: '#f4f4f4', mb: 2, ...props?.accordionProps?.sx }
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState<boolean>(
    props?.accordionProps?.defaultExpanded ?? false,
  )
  const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => setExpanded(isExpanded)
  return (
    <Accordion {...props?.accordionProps} sx={styles} onChange={handleChange}>
      <AccordionSummary
        sx={{
          fontWeight: 600,
          fontSize: '1.1rem',
          fontFamily: FontName.RobotoMedium,
          color: colors.color39,
          '& .MuiAccordionSummary-content.Mui-expanded': {
            //margin: '16px',
          },
        }}
        expandIcon={
          <Tooltip title={expanded ? t('general.toolTip.collapse') : t('general.toolTip.expand')}>
            <ExpandMore />
          </Tooltip>
        }
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {title}
          {iconExtra && (
            <IconButton {...props?.iconExtraProps} sx={{ float: 'right', padding: '0px 0px' }}>
              {iconTooltip ? (
                <Tooltip title={iconTooltip}>{iconExtra as JSX.Element}</Tooltip>
              ) : (
                iconExtra
              )}
            </IconButton>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#fff', padding: '30px 20px' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
