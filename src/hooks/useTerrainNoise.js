import React from 'react'
import useBoxGradient from './useBoxGradient'
import terrainType from '../libs/terrain-types'
import useFractalNoise from './useFractalNoise'

export default function useTerrainNoise(props) {
  const {
    size,
    blur,
    octaves,
    frequency,
    persistence,
    terrainNoise,
    variantNoise
  } = props

  const getBorderGradientValue = useBoxGradient({ size, blur })

  const getTerrainNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: terrainNoise
  })

  const getVariantNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: variantNoise
  })

  const getInfo = React.useCallback(
    (x, y) => {
      const terrainNoise =
        (getTerrainNoise(x, y) + 1) / 2 + (getBorderGradientValue(x, y) - 1)

      const info = {
        x,
        y,
        type: null,
        color: null,
        variantNoise: null,
        terrainNoise: terrainNoise
      }

      if (terrainNoise < 0.2) {
        //water
        info.color = '#003eb2'
        info.type = terrainType.OCEAN
      } else if (terrainNoise < 0.4) {
        //water
        info.color = '#0952c6'
        info.type = terrainType.SEA
      } else if (terrainNoise < 0.45) {
        //sand
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#867645'
          info.type = terrainType.WET_SAND
        } else if (variantNoise < 0.2) {
          info.color = '#a49463'
          info.type = terrainType.SAND
        } else {
          info.color = '#c2b281'
          info.type = terrainType.DRY_SAND
        }
      } else if (terrainNoise < 0.6) {
        //grass
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#284d00'
          info.type = terrainType.DRY_GRASS
        } else if (variantNoise < 0.2) {
          info.color = '#3c6114'
          info.type = terrainType.GRASS
        } else {
          info.color = '#5a7f32'
          info.type = terrainType.WET_GRASS
        }
      } else {
        //mountain
        const variantNoise = getVariantNoise(x, y)
        info.variantNoise = variantNoise

        if (variantNoise < -0.2) {
          info.color = '#ebebeb'
          info.type = terrainType.MOUNTAIN_SNOW
        } else if (variantNoise < 0.2) {
          info.color = '#8c8e7b'
          info.type = terrainType.MOUNTAIN_ORE
        } else {
          info.color = '#a0a28f'
          info.type = terrainType.MOUNTAIN
        }
      }

      return info
    },
    [getTerrainNoise, getVariantNoise, getBorderGradientValue]
  )

  return getInfo
}
