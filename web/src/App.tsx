import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { api } from './lib/axios'

navigator.serviceWorker
  .register('service-worker.js')
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey,
      })
    }

    await api.post('/push/register', {
      subscription,
    })

    await api.post('/push/send', {
      subscription,
    })
  })

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
