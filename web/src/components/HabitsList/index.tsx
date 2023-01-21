import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CheckBox } from '../Form/Checkbox'
import { api } from '../../lib/axios'

interface HabitsListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function getHabits() {
    try {
      const response = await api.get('/day', {
        params: {
          date: date.toISOString(),
        },
      })

      setHabitsInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      const isHabitAlreadyCompleted =
        habitsInfo!.completedHabits.includes(habitId)

      let completedHabits: string[] = []

      if (isHabitAlreadyCompleted) {
        completedHabits = habitsInfo!.completedHabits.filter(
          (id) => id !== habitId,
        )
      } else {
        completedHabits = [...habitsInfo!.completedHabits, habitId]
      }

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      })

      onCompletedChanged(completedHabits.length)
    } catch (error) {
      if (error instanceof AxiosError && error.message) {
        const warn =
          error.message === 'Network Error' && 'Servidor fora do ar!!'
        toast(`${warn} 😮‍💨 !!!`)
      }
    }
  }

  useEffect(() => {
    getHabits()
  }, [])

  return (
    <div className="flex flex-col gap-3 mt-6">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo?.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <CheckBox label={habit.title} checkType="habit" />
          </Checkbox.Root>
        )
      })}
    </div>
  )
}
