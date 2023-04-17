import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.sass'
import Provider from './context/Provider'

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>
)
