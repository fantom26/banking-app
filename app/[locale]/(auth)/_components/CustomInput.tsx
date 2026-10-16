import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1.5 space-y-0'>
          <FormLabel className='text-caption font-medium'>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={name === 'password' ? 'password' : 'text'}
              {...field}
            />
          </FormControl>
          <FormMessage className='text-caption' />
        </FormItem>
      )}
    />
  )
}

export default CustomInput
