import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import './App.css'
import Login from './components/SignComponents/Login/Login'
import Signup from './components/SignComponents/Signup/Signup'
import HomePage from './pages/HomePage'
import SignPage from './pages/SignPage'
import MyPage from './pages/MyPage'
import TaleStorePage from './pages/TaleStorePage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/join`} element={<SignPage />}>
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<Signup />} />
        </Route>
        <Route path={`/mypage`} element={<MyPage />}>
          <Route path={`talestore`} element={<TaleStorePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
