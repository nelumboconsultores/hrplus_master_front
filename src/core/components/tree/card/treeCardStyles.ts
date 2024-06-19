const useTreeCardStyles = () => {
  return {
    container: ({
      haveChildren,
      showBottomButton,
      lastLine,
      readonly,
    }: {
      haveChildren: boolean
      lastLine: boolean
      showBottomButton?: boolean
      readonly?: boolean
    }) => ({
      '& .card-item-tree-styles': {
        position: 'relative',
        '&::before': {
          content: "''",
          position: 'absolute',
          width: '3px',
          ...((!haveChildren || lastLine || !!showBottomButton) && {
            backgroundImage: 'linear-gradient(#cacaca 0%,#cacaca 12%, #fff 0%)',
            left: 'calc(50% - 1px)',
            zIndex: '100',
          }),
          ...(!!showBottomButton && {
            borderLeft: '2px dotted #828282',
          }),
          ...(readonly
            ? {
                height: '50px',
                bottom: '-70px',
                backgroundImage: 'linear-gradient(#cacaca 0%,#cacaca 8%, #fff 0%)',
              }
            : {
                height: '30px',
                bottom: '-50px',
              }),
        },
      },
    }),
    itemContainer: () => ({
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      '& .cardPaper': {
        width: 'fit-content',
        minWidth: '200px',
        cursor: 'pointer',
      },
    }),
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      position: 'absolute',
      top: '-15px',
      right: '-10px',
      '& .MuiIconButton-root': {
        fontSize: '1rem',
        padding: 0,
        '& .MuiSvgIcon-root': {
          fontSize: 'inherit',
        },
      },
    },
    dropDown: ({ isOpen }: { isOpen: boolean }) => ({
      position: 'absolute',
      bottom: '-10px',
      left: 'calc(50% - 10px)',
      backgroundColor: 'secondary.main',
      color: 'background.default',
      padding: '0px',
      zIndex: '100',
      '&:hover': {
        backgroundColor: 'secondary.main',
      },
      fontSize: '1.2rem',
      width: '20px',
      transition: '.500s',
      ...(isOpen && {
        transform: 'rotate(180deg)',
      }),
      '& .MuiSvgIcon-root': {
        fontSize: 'inherit',
        width: 'inherit',
        height: 'inherit',
      },
    }),
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'grey.400',
    },
    addBottom: {
      position: 'absolute',
      bottom: '-80px',
      left: 'calc(50% - 20px)',
      color: 'grey.500',
    },
  }
}

export { useTreeCardStyles }
