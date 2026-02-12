import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { basePath } from './config'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={basePath}>
        <App />
    </BrowserRouter>,
)