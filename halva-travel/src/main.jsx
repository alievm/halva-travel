import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routing/router.jsx'
import { ConfigProvider } from 'antd'
import './i18n';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

createRoot(document.getElementById('root')).render(
    <ConfigProvider
    theme={{
    token: {
        colorPrimary: "#DFAF68"
    }
}}>
     <Toaster position="top-right" />
     <I18nextProvider i18n={i18n}>
     <AppRouter />
</I18nextProvider>
    
    </ConfigProvider>
)
