import { FormEvent, useState } from 'react'
import { AxiosError } from 'axios'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getWeekDays } from '../../utils/get-week-days'
import { api } from '../../lib/axios'

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const availableWeekDays = getWeekDays()

  async function createNewHabit(e: FormEvent) {
    e.preventDefault()

    if (!title || weekDays.length === 0) {
      toast('Coloque o título e selecione pelo menos um dia da semana!!')
      return
    }

    try {
      const response = await api.post('/habits', {
        title,
        weekDays,
      })

      if (response) {
        toast('Hábito criado com sucesso 🤩!!')

        setTitle('')
        setWeekDays([])
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
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-800 focus:outline-0
        focus:ring-zinc-500 focus:border-zinc-500 hover:border-zinc-500 transition-all duration-500 ease-in-out"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 focus:outline-0 focus:ring-green-500 focus:border-green-500
                hover:border-green-500 transitions-all duration-500 ease-in-out"
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-all duration-500 ease-in-out"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
