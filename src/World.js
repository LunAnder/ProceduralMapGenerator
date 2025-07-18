import React from 'react'
import chance from 'chance'
import WorldClouds from './WorldClouds'
import WorldTerrain from './WorldTerrain'
import useNoise2D from './hooks/useNoise2D'
import useTerrainNoise from './hooks/useTerrainNoise'

function World(props) {
  const random = chance(`${Math.random()}`)

  const {
    size,
    clouds = true,
    cloudsSeed = random.integer({ min: 1000, max: 9999 }),
    terrainSeed = random.integer({ min: 1000, max: 9999 }),
    cloudsVariantSeed = random.integer({ min: 1000, max: 9999 }),
    terrainVariantSeed = random.integer({ min: 1000, max: 9999 })
  } = props

  const getTerrainInfo = useTerrainNoise({
    size,
    blur: 100,
    octaves: 20,
    frequency: 0.00625,
    persistence: 0.6,
    terrainNoise: useNoise2D({ seed: terrainSeed }),
    variantNoise: useNoise2D({ seed: terrainVariantSeed })
  })

  return (
    <div className="AppWorld" style={{ width: size, height: size }}>
      <WorldTerrain size={size} getInfo={getTerrainInfo} />

      {clouds === true && (
        <WorldClouds
          size={size}
          cloudsSeed={cloudsSeed}
          variantSeed={cloudsVariantSeed}
        />
      )}
    </div>
  )
}

export default React.memo(World)
