import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import App from './App'
import { DiagnosisContextProvider } from './context/DiagnosisContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DiagnosisContextProvider>
        <App />
      </DiagnosisContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);