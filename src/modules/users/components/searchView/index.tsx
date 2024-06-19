import { Grid } from '@mui/material'
import { RightSide, UserForm } from '..'

export const SearchView: React.FC = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <UserForm />
      </Grid>
      <Grid item xs={5}>
        <RightSide />
      </Grid>
    </Grid>
  )
}
