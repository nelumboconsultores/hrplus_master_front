import { Breadcrumbs } from '@mui/material'
import Link, { LinkProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { PathName, breadcrumbNameMap } from 'core/enum'
import { icons } from 'core/utils'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { styles } from './styles'

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink} />
}

type BreadCrumbsListProps = {
  list?: Array<string>
}

export const BreadCrumbsList: React.FC<BreadCrumbsListProps> = (props) => {
  const { list } = props
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const clearPathnames = pathnames.filter((x) => {
    const num = Number(x)
    return isNaN(num)
  })

  if (list && list.length > 0)
    //Cuando son a mano
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter underline="hover" color="inherit" to={PathName.Home} sx={styles.text}>
          {icons.home}
        </LinkRouter>
        {list.map((value, index) => {
          const last = index === list.length - 1
          const to = `/${list.slice(0, index + 1).join('/')}`

          return last ? (
            <Typography color="text.primary" key={to} sx={styles.text}>
              {breadcrumbNameMap[value] ?? value}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={value} key={to} sx={styles.text}>
              {breadcrumbNameMap[value]}
            </LinkRouter>
          )
        })}
      </Breadcrumbs>
    )
  return (
    //cuando son dinámicas
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to={PathName.Home} sx={styles.text}>
        {icons.home}
      </LinkRouter>
      {clearPathnames.map((_value, index) => {
        const last = index === clearPathnames.length - 1
        const to = `/${clearPathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography color="text.primary" key={to} sx={styles.text}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to} sx={styles.text}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        )
      })}
    </Breadcrumbs>
  )
}
