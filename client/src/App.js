import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login_register from './components/Login_register'
import Movements from './components/Movements'


function App() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const verified = await axios.get('api/auth/verify', {
          headers: { Authorization: token }
        })
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      {
        isLogin
          ? <Movements setIsLogin={setIsLogin} />
          : <Login_register setIsLogin={setIsLogin} />
      }
    </div>
  );
}

export default App;