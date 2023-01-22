import { createContext, ReactNode, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { api } from '../lib/axios'
import { Summary } from '../@types/summary'

export interface HabitsContextType {
  summary: Summary[]
  getSummary: () => void
  isLoading: boolean
}

interface HabitsContextProviderProps {
  children: ReactNode
}

// CONTEXT
export const HabitsContext = createContext({} as HabitsContextType)

export function HabitsContextProvider({
  children,
}: HabitsContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<Summary[]>([])

  async function getSummary() {
    try {
      setIsLoading(true)

      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AxiosError && error.message) {
        const warn =
          error.message === 'Network Error' && 'Servidor fora do ar!!'
        toast(`${warn} 😮‍💨 !!!`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSummary()
  }, [])

  return (
    <HabitsContext.Provider value={{ summary, getSummary, isLoading }}>
      {children}
    </HabitsContext.Provider>
  )
}
