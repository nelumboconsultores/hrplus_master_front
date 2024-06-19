const useGenerateHierarcgyStyles = () => {
  return {
    container: (isCompleted: boolean) => ({
      paddingBottom: isCompleted ? '0px' : '70px',
    }),
    modal: {
      zIndex: '1000',
    },
    noData: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '250px',
    },
  }
}

export { useGenerateHierarcgyStyles }
