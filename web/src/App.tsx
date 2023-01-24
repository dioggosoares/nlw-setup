import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

export function App() {
  return (
    <>
      <main className="w-full max-w-5xl h-screen flex items-center mx-auto">
        <div className="flex flex-col w-full max-w-5xl px-8 py-10 lg:py-0 gap-16">
          <Header />
          <SummaryTable />
        </div>
      </main>
    </>
  )
}
