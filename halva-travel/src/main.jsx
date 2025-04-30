import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routing/router.jsx'
import { ConfigProvider } from 'antd'
import './i18n';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <ConfigProvider
    theme={{
    token: {
        colorPrimary: "#DFAF68"
    }
}}>
     <Toaster position="top-right" />
    <AppRouter />
    </ConfigProvider>
)
