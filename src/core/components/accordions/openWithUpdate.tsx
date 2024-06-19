import { icons } from 'core'
import { GeneralAccordion } from '.'
import { useTranslation } from 'react-i18next'

type OpenWithUpdateProps = {
  children: React.ReactNode
  title: string
  hiddenIcon?: boolean
  onRefresh?: () => void
}

export const OpenWithUpdate: React.FC<OpenWithUpdateProps> = ({
  children,
  title,
  hiddenIcon,
  onRefresh,
}) => {
  const { t } = useTranslation()
  return (
    <GeneralAccordion
      title={title}
      props={{
        accordionProps: {
          defaultExpanded: true,
          sx: { width: '100%' },
        },
        iconExtraProps: {
          color: 'secondary',
          onClick: (e) => {
            if (hiddenIcon) return
            e.stopPropagation()
            if (onRefresh) onRefresh()
          },
        },
      }}
      iconTooltip={t('general.button.update')}
      iconExtra={hiddenIcon ? <></> : icons.cached}
    >
      {children}
    </GeneralAccordion>
  )
}
