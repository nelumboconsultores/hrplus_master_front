import { Tab, Tabs, TabsProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { styles } from './styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { LinkTabProps, samePageLinkNavigation } from './funtions'

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate()
  return (
    <Tab
      disabled={props.disabled}
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (props.href) navigate(props.href)

        if (samePageLinkNavigation(event)) event.preventDefault()
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  )
}

type WithTitleProps = { list?: LinkTabProps[]; title: string } & TabsProps

export const WithTitleTabs: React.FC<WithTitleProps> = ({ list, title, ...props }) => {
  const [value, setValue] = useState(1)
  const location = useLocation()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))
    ) {
      setValue(newValue)
    }
  }
  useEffect(() => {
    list?.forEach((item, index) => {
      if (location.pathname.includes(item.href ?? '')) setValue(index + 1)
    })
  }, []) // eslint-disable-line
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
      <Tab disabled label={title} sx={styles.itemTitle} />
      {!!list && list.map((item, index) => <LinkTab key={index} {...item} />)}
    </Tabs>
  )
}
