import React from 'react'
import Appartement from './components/Appartement'
import Locataires from './components/Locataires'
import Paiements from './components/Paiements'

const App = () => {
  return (
    <div>
      <Appartement />
      <Locataires />
      <Paiements />
    </div>
  )
}

export default App