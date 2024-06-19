export const getPath = (route: string) => {
  const path = route.split('/')
  const lastPath = path[path.length - 1]
  return lastPath
}
