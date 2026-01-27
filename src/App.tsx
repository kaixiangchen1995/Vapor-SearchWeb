import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useRoutes } from 'react-router-dom'
import routes from './routes/index'

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  return (
    <>
       <div className={darkTheme ? 'dark' : ''}>
       <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen' >
          <Navbar darkTheme = {darkTheme} setDarkTheme={setDarkTheme}/>
          {useRoutes(routes)}
          <Footer/>
       </div>
       </div>
    </>
  )
}

export default App
