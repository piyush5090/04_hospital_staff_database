import { useState } from 'react'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-col' >
      <Navbar />
      <div className='h-screen' ></div>
      <Footer />
    </div>
    </>
  )
}

export default App
