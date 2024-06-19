import { Tab, Tabs, TabsProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { styles } from './styles'
import { LinkTabProps, samePageLinkNavigation } from './funtions'
import { useLocation, useNavigate } from 'react-router-dom'

function LinkTab({ onClickOutside, ...props }: LinkTabProps) {
  const navigate = useNavigate()

  return (
    <Tab
      disabled={props.disabled}
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClickOutside) onClickOutside(event, props?.href ?? '')
        else {
          if (props.href) navigate(props.href)
          if (samePageLinkNavigation(event)) event.preventDefault()
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  )
}

type CompleteTabsProps = { list: LinkTabProps[]; getValue?: (index: number) => void } & TabsProps

export const CompleteTabs: React.FC<CompleteTabsProps> = ({ getValue, list, ...props }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  useEffect(() => {
    // Use the pathname to determine the selected tab index
    const index = list.findIndex((item) => item.href === location.pathname)
    if (index !== -1) {
      setValue(index)
    } else {
      setValue(0)
    }
  }, [list, location.pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))
    ) {
      if (newValue >= 0 && newValue < list.length && list[newValue]?.href) {
        if (getValue) getValue(newValue)
        setValue(newValue)
        navigate(list[newValue].href as string)
      }
    }
  }

  return (
    <Tabs
      {...props}
      value={value}
      onChange={handleChange}
      role="navigation"
      sx={styles.tapsContainer}
      variant="fullWidth"
      centered
      indicatorColor="secondary"
      textColor="inherit"
    >
      {list.map((item, index) => (
        <LinkTab key={index} {...item} />
      ))}
    </Tabs>
  )
}
