import * as Popover from '@radix-ui/react-popover'
import * as Checkbox from '@radix-ui/react-checkbox'
// import { Check } from 'phosphor-react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { ProgressBar } from '../ProgressBar'
import { CheckBox } from '../Form/Checkbox'

interface HabitProps {
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ amount = 0, completed = 0, date }: HabitProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg">
        <div
          className={clsx('bg-zinc-900 rounded-md w-9 h-9', {
            'bg-zinc-900 border-zinc-800 scale-0': completedPercentage === 0,
            'bg-violet-900 scale-[.15]':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 scale-[.25]':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 scale-50':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 scale-75':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 scale-90':
              completedPercentage >= 80 && completedPercentage < 100,
            'bg-violet-500 scale-100': completedPercentage >= 80,
          })}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="flex flex-col min-w-[20rem] p-6 rounded-2xl bg-zinc-900">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root className="flex items-center gap-3 group focus:outline-none">
              <CheckBox
                label="Beber 2L de água"
                checkType="habit"
                type="button"
              />
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
