interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600 transition-all duration duration-500 ease-in-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}
