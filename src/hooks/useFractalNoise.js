import React from 'react'

export default function useFractalNoise(props) {
  const [cache, setCache] = React.useState({})
  const { octaves, persistence, noise, frequency } = props

  const getNoise = React.useMemo(() => {
    return newFractalNoise({
      noise,
      octaves,
      frequency,
      persistence
    })
  }, [octaves, frequency, persistence, noise])

  return React.useCallback(
    (x, y) => {
      const id = `${x}:${y}`

      if (cache[id] == null) {
        setCache(Object.assign(cache, { [id]: getNoise(x, y) }))
      }

      return cache[id]
    },
    [cache, getNoise]
  )
}

// https://gist.github.com/tabone/0e660d897f87b3d64d6e69659162e9f0
function newFractalNoise (info) {
  const {
    noise,
    octaves = 1,
    amplitude = 1.0,
    frequency = 1.0,
    persistence = .5
  } = info
  
  return function getFractalNoise (x, y) {
    let value = 0.0

    for (let octave = 0; octave < octaves; octave++) {
      let freq = frequency * Math.pow(2, octave)

      value += noise(
        x * freq,
        y * freq
      ) * (amplitude * Math.pow(persistence, octave))
    }

    return value / (2 - 1 / Math.pow(2, octaves - 1))
  }
}