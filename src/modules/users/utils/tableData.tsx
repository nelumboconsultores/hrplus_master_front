import { Box, Chip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nombres y Apellidos', flex: 2 },
  {
    field: 'sex',
    headerName: 'Sexo',
    flex: 1,
  },
  {
    field: 'position',
    headerName: 'Cargo',
    flex: 1,
  },
  {
    field: 'journey',
    headerName: 'Jornada',
    flex: 1,
  },
  {
    field: 'groups',
    headerName: 'Grupos',
    flex: 2,
    renderCell: (params) => {
      const groups = params?.value as string[]

      return (
        <Box>
          {groups?.map((group) => (
            <Chip
              key={group}
              label={group}
              size="small"
              color="primary"
              sx={{ mr: 0.5 }}
              variant="outlined"
            />
          ))}
        </Box>
      )
    },
  },
]

export const rows = [
  {
    id: 1,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 2,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 3,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 4,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 5,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 6,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 7,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 8,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 9,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 10,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 11,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
  {
    id: 12,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['Sample'],
  },
  {
    id: 13,
    name: 'Juan Francisco Pérez Jiménez',
    sex: 'Masculino',
    position: 'Promotor',
    journey: 'Turno A',
    groups: ['General', 'Sample'],
  },
]
