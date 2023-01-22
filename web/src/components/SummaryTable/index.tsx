import { useContext } from 'react'
import { Minus, Plus } from 'phosphor-react'
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.css'

import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning'
import { HabitDay } from '../HabitDay'

import { HabitsContext } from '../../contexts/HabitsContext'

import squares from '../../assets/unfilled-squares.svg'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDateSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length

export function SummaryTable() {
  const { summary } = useContext(HabitsContext)

  return (
    <div className="w-full flex flex-col gap-4">
      <div id="habits" className="w-full flex">
        <div id="weekDays" className="grid grid-rows-7 grid-flow-row gap-3">
          {weekDays.map((weekDay, i) => {
            return (
              <div
                key={`${weekDay}-${i}`}
                className="flex items-center justify-center text-zinc-400 text-xl w-10 h-10 font-bold"
              >
                {weekDay}
              </div>
            )
          })}
        </div>
        <div id="habitDay" className="grid grid-rows-7 grid-flow-col gap-3">
          {summary.length > 0 &&
            summaryDates.map((date) => {
              const dayInSummary = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  amount={dayInSummary?.amount}
                  defaultCompleted={dayInSummary?.completed}
                />
              )
            })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                />
              )
            })}
        </div>
      </div>
      <div
        id="legend"
        className="flex w-full gap-3 items-center justify-end px-4"
      >
        <Minus size={16} />
        <img src={squares} alt="" />
        <Plus size={16} />
      </div>
    </div>
  )
}
