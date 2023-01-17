import { Habit } from './components/Habit'

export default function App() {
  return (
    <>
      <main className="flex flex-col w-full max-w-[90rem] mx-auto px-10 text-gray-100">
        <Habit completed={5} />
        <Habit completed={10} />
        <Habit completed={20} />
      </main>
    </>
  )
}
