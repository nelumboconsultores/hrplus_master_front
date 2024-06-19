import { InputRootProps } from '.'

export type InputSearchProps = InputRootProps & { enter?: () => void; clickDelete?: () => void }
