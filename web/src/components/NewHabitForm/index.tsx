import { Check } from 'phosphor-react'

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
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
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

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
