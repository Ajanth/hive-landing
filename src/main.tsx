import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReleaseProvider } from '@/components/release-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReleaseProvider>
      <App />
    </ReleaseProvider>
  </StrictMode>,
)
