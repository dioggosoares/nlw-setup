import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

export function App() {
  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col w-full max-w-5xl px-6 gap-16">
          <Header />
          <SummaryTable />
        </div>
      </main>
    </>
  )
}
