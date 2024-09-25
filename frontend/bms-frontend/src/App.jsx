import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import store from './redux/store'
import ProtectedRoute from './pages/ProtectedRoute'
import Admin from './pages/Admin'
import Partner from './pages/Partner'
import SingleMovie from './pages/SingleMovie'
import BookShow from './pages/BookShow'
import Loader from './pages/Loader'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import NewPassword from './pages/NewPassword'

function App() {
  return (
    <Provider store={store}>
      <Loader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/partner" element={<ProtectedRoute><Partner /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/new-password/:email" element={<NewPassword />} />

          <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie /></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
