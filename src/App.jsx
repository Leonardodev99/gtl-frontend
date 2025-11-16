import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
          <Routes>
             {/* Tela de carregamento inicial */}
            <Route path="/" element={<LoadingScreen />} />

             {/* Telas de autenticação */}
            <Route path="/login" element={<Login />}/>

             {/* Telas do dashboard */}
             <Route path="/dashboard" element={<Dashboard />}/>

             {/* Telas do recuperação*/}
             <Route path="/forgot-password" element={<ForgotPassword />}/>

    
      </Routes>
        
      
    </BrowserRouter>
  )
}

export default App
