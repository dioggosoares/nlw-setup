import { Plus } from "phosphor-react";

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <header className="w-full max-w-[90rem] mx-auto py-8 px-10">
      <div className="flex items-center justify-between">
        <img src={logo} alt="asdsa" />
        <button className="flex items-center gap-4 border border-primary-300 rounded-lg px-6 py-3 text-gray-50
            hover:text-gray-300 transitions-all duration-150 ease-linear">
          <Plus />
          Novo hábito
        </button>
      </div>
    </header>
  )
}