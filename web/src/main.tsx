import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ToastContainer } from 'react-toastify'

import { HabitsContextProvider } from './contexts/HabitsContext'

import './lib/dayjs'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HabitsContextProvider>
      <App />
      <ToastContainer
        progressStyle={{ background: '#8B5CF6' }}
        toastStyle={{ backgroundColor: '#29292E' }}
      />
    </HabitsContextProvider>
  </React.StrictMode>,
)
