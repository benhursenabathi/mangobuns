import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function AppRoot() {
  useLayoutEffect(() => {
    document.documentElement.classList.add('app-ready')
  }, [])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
