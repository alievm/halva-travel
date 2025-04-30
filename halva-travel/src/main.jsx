import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routing/router.jsx'
import { ConfigProvider } from 'antd'
import './i18n';
import i18n from 'i18next';
import { Toaster } from 'react-hot-toast';

alert(i18n.language)

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
