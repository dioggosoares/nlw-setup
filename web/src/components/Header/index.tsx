import { Plus } from 'phosphor-react'

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <header className="flex items-center justify-between w-full max-w-3xl mx-auto py-8 px-10">
      <img src={logo} alt="Habits" />
      <button
        type="button"
        className="flex items-center gap-3 font-semibold border border-violet-500 rounded-lg px-6 py-4 text-gray-50
                  hover:border-violet-300 transitions-all duration-150 ease-linear"
      >
        <Plus size={20} className="text-violet-500" />
        Novo hábito
      </button>
    </header>
  )
}
