import { InputSwitch } from 'core/components/inputs'
import { ReturnInputFields } from 'core/types'
import { useFormContext } from 'react-hook-form'

type BinaryInputProps = {
  field: ReturnInputFields
}

export const BinaryInput: React.FC<BinaryInputProps> = ({ field }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const { name, label } = field
  return (
    <InputSwitch
      {...register(name)}
      checked={watch(name)}
      label={label}
      error={errors[name]?.message as string}
    />
  )
}
