import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { InputSearch } from '..'
import { FontName, HeaderListProps, icons } from 'core'
import { useForm } from 'react-hook-form'

type fields = {
  search: string
}

export const HeaderList: React.FC<HeaderListProps> = (props) => {
  const {
    children,
    title,
    subTitle,
    titleRender,
    buttonLabel,
    inputSearch,
    buttonProps,
    buttonFilterProps,
    buttonLabelFilter,
    buttonLabelOpenFilter,
    buttonLabelOpenFilterProps,
    buttonLabelCollaborators,
    buttonLabelCollaboratorsProps,
    /* buttonLabelDownload,
    buttonDownloadProps, */
    marginY,
    searchProps,
  } = props
  const { register, handleSubmit, watch, reset } = useForm<fields>()
  const onSubmit = (data: fields) => searchProps?.getSearchValue(data.search)
  const clickDelete = () => {
    reset()
    onSubmit({ search: '' })
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        my: marginY ?? '24px',
        alignItems: 'center',
      }}
    >
      <Box>
        {title ? <Typography variant="h1">{title}</Typography> : titleRender}
        {subTitle && (
          <Typography variant="h1" sx={{ fontSize: '16px' }}>
            {subTitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {children}
        {inputSearch && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputSearch
              {...searchProps}
              {...register('search')}
              label={'Buscar'}
              placeholder="Buscar"
              sx={{ width: '240px' }}
              size="small"
              value={watch('search')}
              clickDelete={clickDelete}
            />
          </form>
        )}
        {/*   {buttonLabelDownload && (
          <IconButton
            {...buttonDownloadProps}
            sx={{
              color: '#24A9E2',
              '& .MuiSvgIcon-root': {
                fontSize: '1.6rem',
              },
            }}
          >
            {icons.Download}
          </IconButton>
        )} */}
        {buttonLabelFilter && (
          <Button
            {...buttonFilterProps}
            variant="text"
            sx={{
              fontFamily: FontName.RobotoMedium,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
            }}
          >
            {buttonLabelFilter}
          </Button>
        )}
        {!!props.additionalButtonProps && <Button {...props.additionalButtonProps} />}
        {buttonLabelCollaborators && (
          <Button
            {...buttonLabelCollaboratorsProps}
            variant="text"
            sx={{
              fontFamily: FontName.RobotoMedium,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
            }}
          >
            {buttonLabelCollaborators}
          </Button>
        )}
        {buttonLabelOpenFilter && (
          <Tooltip title={'Filtros'}>
            <IconButton
              {...buttonLabelOpenFilterProps}
              sx={{
                color: '#24A9E2',
                '& .MuiSvgIcon-root': {
                  fontSize: '1.6rem',
                },
              }}
            >
              {icons.TuneOutlined}
            </IconButton>
          </Tooltip>
        )}
        {buttonLabel && (
          <Button
            {...buttonProps}
            color="secondary"
            sx={{
              fontFamily: FontName.RobotoMedium,
              fontSize: '0.9rem',
            }}
          >
            {buttonLabel}
          </Button>
        )}
      </Box>
    </Box>
  )
}
