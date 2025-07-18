import React from 'react'
import World from './World'
import './styles.css'

export default function App() {
  return (
    <div className="App">
      <World
        size={700}
        clouds={false}
        // cloudsSeed={3964}
        // terrainSeed={7635}
        // cloudsVariantSeed={7829}
        // terrainVariantSeed={3333}
      />
    </div>
  )
}
