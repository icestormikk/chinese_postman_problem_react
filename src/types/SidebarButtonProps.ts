export type SidebarButtonProps = {
  icon: JSX.Element,
  onClick: (...args: unknown[]) => void,
  title?: string,
  isDisabled?: boolean
}