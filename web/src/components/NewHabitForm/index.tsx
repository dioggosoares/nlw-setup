import { FormEvent, useContext, useState } from 'react'
import { AxiosError } from 'axios'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { api } from '../../lib/axios'
import { HabitsContext } from '../../contexts/HabitsContext'
import { getWeekDays } from '../../utils/get-week-days'
import { CheckBox } from '../Form/Checkbox'

export function NewHabitForm() {
  const { getSummary } = useContext(HabitsContext)
  const [title, setTitle] = useState('')
  const [warnings, setWarnings] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const availableWeekDays = getWeekDays()

  async function createNewHabit(e: FormEvent) {
    e.preventDefault()

    try {
      if (!title) {
        setWarnings('Coloque um título para o hábito!!')
      } else if (weekDays.length === 0) {
        setWarnings('Selecione pelo menos um dia da semana!')
      } else {
        const response = await api.post('/habits', {
          title,
          weekDays,
        })

        if (response) {
          toast('Hábito criado com sucesso 🤩!!')
          getSummary()

          setTitle('')
          setWeekDays([])
          setWarnings('')
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.message) {
        toast(`${error.message} 😮‍💨 !!!`)
      }
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 border-2 border-zinc-900 focus:outline-0
        focus:ring-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-500 ease-in-out"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <span className="text-sm text-red-500 px-3 mt-4">{warnings}</span>

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <CheckBox label={weekDay} checkType="weekday" />
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500
        focus:outline-0 focus:ring-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-500 ease-in-out"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
