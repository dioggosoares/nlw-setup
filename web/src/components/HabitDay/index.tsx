import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { ProgressBar } from '../ProgressBar'
import { HabitsList } from '../HabitsList'

interface HabitProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2
        border-zinc-800 rounded-lg focus:outline-0 focus:ring-violet-600 focus:ring-2
        focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-500 ease-in-out"
      >
        <div
          className={clsx(
            'bg-zinc-900 rounded-md w-9 h-9 transition-all duration-500 ease-in-out',
            {
              'bg-zinc-900 border-zinc-800 scale-0': completedPercentage === 0,
              'bg-violet-900 scale-[.15]':
                completedPercentage > 0 && completedPercentage < 20,
              'bg-violet-800 scale-[.25]':
                completedPercentage >= 20 && completedPercentage < 40,
              'bg-violet-700 scale-50':
                completedPercentage >= 40 && completedPercentage < 60,
              'bg-violet-600 scale-75':
                completedPercentage >= 60 && completedPercentage < 80,
              'bg-violet-500 scale-[.85]':
                completedPercentage >= 80 && completedPercentage < 100,
              'bg-violet-500 scale-100': completedPercentage === 100,
            },
          )}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="flex flex-col min-w-[20rem] p-6 rounded-2xl bg-zinc-900">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          {/* <div className="flex flex-col gap-3 mt-6">
            <Checkbox.Root className="flex items-center gap-3 group focus:outline-none">
              <CheckBox
                label="Beber 2L de água"
                checkType="habit"
                type="button"
              />
            </Checkbox.Root>
          </div> */}

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
