import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer } from 'react-toastify'
import Update from './pages/Update'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
    </Routes>
   <ToastContainer theme='colored'></ToastContainer>
   </BrowserRouter>
  )
}

export default App
