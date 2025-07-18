import React from "react"
import cloudType from "../libs/cloud-types"
import useBoxGradient from "./useBoxGradient"
import useFractalNoise from "./useFractalNoise"

export default function useCloudsNoise(props) {
  const {
    size,
    blur,
    octaves,
    frequency,
    cloudsNoise,
    persistence,
    variantNoise
  } = props

  const [offset, setOffset] = React.useState(0)
  const getBorderGradientValue = useBoxGradient({ size, blur })

  React.useEffect(() => {
    const animationID = window.requestAnimationFrame(() => {
      setOffset(offset + 1)
    })

    return () => window.cancelAnimationFrame(animationID)
  }, [offset])

  const getCloudsNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: cloudsNoise
  })

  const getVariantNoise = useFractalNoise({
    octaves,
    frequency,
    persistence,
    noise: variantNoise
  })

  return React.useCallback(
    (x, y) => {
      const cloudNoise =
        (getCloudsNoise(offset + x / 1.6, y / 1.6) + 1) / 2 +
        (getBorderGradientValue(x, y) - 1)

      const variantNoise = getVariantNoise(x, y)

      const info = {
        type: null,
        cloudNoise,
        color: null,
        variantNoise
      }

      if (cloudNoise >= 0.7 && cloudNoise < 0.8) {
        info.color = "#fff"
        info.type = cloudType.NORMAL
      } else if (cloudNoise >= 0.8 && cloudNoise < 1) {
        info.color = "#ccc"
        info.type = cloudType.RAINY
      }

      return info
    },
    [offset, getCloudsNoise, getVariantNoise, getBorderGradientValue]
  )
}
