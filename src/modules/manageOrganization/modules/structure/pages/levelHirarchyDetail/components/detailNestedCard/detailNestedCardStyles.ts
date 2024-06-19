const useDetailNestedCard = () => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'grey.400',
    },
    description: {
      fontSize: '14px',
      color: 'grey.400',
    },
    containerInformation: {
      '& .MuiTypography-root': {
        textAlign: 'start',
      },
    },
    containerIcons: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
  }
}

export { useDetailNestedCard }
