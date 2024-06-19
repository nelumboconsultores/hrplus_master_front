const useTreeMenuStyles = () => {
  return {
    container: ({ position }: { position: { right?: number; top?: number } }) => ({
      maxHeight: '330px',
      '& .MuiPopover-paper.MuiPopover-paper.MuiPopover-paper': {
        ...(!!position.right && {
          left: `${position.right}px !important`,
        }),
      },
      '& ul': {
        padding: '0px',
        maxWidth: '250px',
      },

      '&::before': {
        content: "' '",
        width: '20px',
        height: '20px',
        transform: 'rotate(45deg)',
        position: 'absolute',
        background: 'linear-gradient(45deg, #fff 0%, #fff 50%, transparent 50%, transparent 100%)',
        left: `${(position.right ?? 0) - 10}px`,
        top: `${(position.top ?? 0) - 40}px`,
        zIndex: '1000',
        boxShadow: '0px 2px 5px -7px rgba(0, 0, 0, 0.2), 2px 5px -1px -4px rgba(0, 0, 0, 0.2)',
      },
    }),
    itemMenu: {
      transition: 'none',
      padding: '10px',
      borderBottom: '2px solid #000',
      borderBottomColor: 'grey.800',
      '&:hover': {
        backgroundColor: 'primary.800',
        color: 'background.default',
        '& .MuiBox-root': {
          backgroundColor: 'primary.800',
        },
        '& .MuiTypography-root': {
          color: 'background.default',
        },
      },
    },
    items: {
      padding: '5px',
      width: '100%',
      '& .MuiTypography-root': {
        color: 'grey.400',
        fontSize: '18px',
        wordBreak: 'break-word',
      },
    },
  }
}

export { useTreeMenuStyles }
