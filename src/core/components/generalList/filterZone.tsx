import { TemplatePaper } from '..'
type FilterZoneProps = {
  children: React.ReactElement
}
export const FilterZone: React.FC<FilterZoneProps> = ({ children }) => {
  return <TemplatePaper sx={{ marginBottom: '32px' }}>{children}</TemplatePaper>
}
