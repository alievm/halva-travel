import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#DFAF68',
      },
    }}
  >
    <AuthProvider>

<App />
</AuthProvider>
  </ConfigProvider>
  
  </StrictMode>,
)
