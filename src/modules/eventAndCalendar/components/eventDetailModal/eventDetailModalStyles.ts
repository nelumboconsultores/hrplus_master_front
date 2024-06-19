const useEventDetailModalStyles = () => {
  return {
    container: {
      padding: '20px 0px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    title: {
      fontSize: '1rem',
      fontWeight: '600',
      '& span': {
        color: 'blue',
      },
      lineHeight: '1',
    },
    itemTitle: {
      fontSize: '1rem',
    },
    header: {
      width: '100%',
      padding: '0px 20px 20px',
      borderBottom: '1px solid #aaa',
    },
    footer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    detailDate: {
      fontSize: '.6rem',
    },
    containerItems: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      height: 'auto',
      maxHeight: 'calc(90vh - 100px)',
      overflowY: 'auto',
      '& .MuiTypography-root': {
        wordBreak: 'break-word',
      },
    },
    eventItem: {
      width: '100%',
      padding: '0px 20px 20px',
      borderBottom: '1px solid #aaa',
      '&:last-child': {
        borderBottom: '0px solid #aaa',
        marginBottom: '0px',
        paddingBottom: '0px',
      },
    },
    noData: {
      padding: '0px 20px',
    },
    description: {
      fontSize: '.8rem',
      lineHeight: '1',
    },
  }
}

export { useEventDetailModalStyles }
