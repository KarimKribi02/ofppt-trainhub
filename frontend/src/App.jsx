import React from 'react'
import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Ceci est un paragraphe stylisé avec Tailwind CSS.
      </p>
      
    </>
  )
}

export default App
