
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
const Dashboard = React.lazy(()=> import ('./components/Dashboard'))
const Landing = React.lazy(()=> import ('./components/Landing'))

function App() {


  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/dashboard' element={<Suspense  fallback={'loading...'}><Dashboard /></Suspense>}></Route>
          <Route path='/' element={<Suspense  fallback={'loading...'}><Landing /></Suspense>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Navbar() {

  const navigate = useNavigate()

  const handleClick = (path) => {
    // startTransition(() => {
    navigate(path)
    // })
  }
  return (
    <div>
      <button onClick={() => { handleClick('/dashboard') }}>DashBoard</button>
      <button onClick={() => { handleClick('/') }}>Landing</button>
    </div>

  )
}

export default App
