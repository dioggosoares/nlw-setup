import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface CheckboxProps {
  label: string
  type: 'button' | 'submit'
  checkType: 'habit' | 'weekday'
}

export function CheckBox({ label, type, checkType }: CheckboxProps) {
  return (
    <>
      <button
        type={type}
        className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 hover:border-green-500 focus:outline-0
                focus:ring-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-500 ease-in-out"
      >
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </button>

      <span
        className={
          checkType === 'habit'
            ? 'font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
            : 'text-white leading-tight'
        }
      >
        {label}
      </span>
    </>
  )
}
