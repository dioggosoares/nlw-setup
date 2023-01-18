import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Header } from './components/Header'

import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
)