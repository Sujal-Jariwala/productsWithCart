import { useState } from 'react'
import './App.css'
import Products from './components/Prodcuts'
import { CartProvider } from './context/CartContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>

    <Products/>
    </CartProvider>
    </>
  )
}

export default App
