export function samePageLinkNavigation(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false
  }
  return true
}
export interface LinkTabProps {
  label?: string
  href?: string
  selected?: boolean
  disabled?: boolean
  onClickOutside?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => void
}
