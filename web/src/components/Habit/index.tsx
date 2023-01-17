interface HabitProps {
  completed: number
}

export function Habit({ completed }: HabitProps) {
  return (
    <div className="flex items-center justify-center text-white rounded-lg m-2 border border-zinc-600 bg-zinc-800 w-10 h-10">
      {completed}
    </div>
  )
}
