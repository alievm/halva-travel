import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routing/router.jsx'
import { ConfigProvider } from 'antd'
import './i18n';

createRoot(document.getElementById('root')).render(
    <ConfigProvider
    theme={{
    token: {
        colorPrimary: "#DFAF68"
    }
}}>
    <AppRouter />
    </ConfigProvider>
)
