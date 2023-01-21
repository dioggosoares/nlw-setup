import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'phosphor-react'

import logo from '../../assets/logo.svg'
import { NewHabitForm } from '../NewHabitForm'

export function Header() {
  return (
    <header className="flex items-center justify-between w-full max-w-3xl mx-auto py-8 px-10">
      <img src={logo} alt="Habits" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="flex items-center gap-3 font-semibold border-2 border-violet-500
          rounded-lg px-6 py-4 text-gray-50 hover:border-violet-800 focus:outline-0
          focus:ring-violet-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
          transitions-all duration-500 ease-in-out"
        >
          <Plus size={20} className="text-violet-500" />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
          <Dialog.Content
            className="absolute p-10 bg-zinc-900 rounded-2xl w-full
            max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Dialog.Close
              className="absolute right-6 top-6 text-zinc-400 rounded-md hover:text-zinc-200
              focus:outline-none focus:ring-green-500 focus:ring-2 focus:ring-offset-2
            focus:ring-offset-zinc-900 transition-all duration-500 ease-in-out"
            >
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}
