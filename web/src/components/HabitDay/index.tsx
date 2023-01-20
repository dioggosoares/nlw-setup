import * as Popover from '@radix-ui/react-popover'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { ProgressBar } from '../ProgressBar'

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
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-400':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
          },
        )}
      />

      <Popover.Portal>
        <Popover.Content className="flex flex-col min-w-[20rem] p-6 rounded-2xl bg-zinc-900">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 focus:outline-0 focus:ring-green-500 focus:border-green-500
                hover:border-green-500 transitions-all duration-500 ease-in-out"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
