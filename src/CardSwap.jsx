import { Children, cloneElement, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

export const Card = ({ children }) => <div className="card-swap__card">{children}</div>

const CardSwap = ({
  children,
  cardDistance = 50,
  verticalDistance = 60,
  delay = 4000,
  pauseOnHover = true,
}) => {
  const stackRef = useRef(null)
  const controlsRef = useRef({ start: () => {}, stop: () => {} })
  const cards = useMemo(() => Children.toArray(children).filter(Boolean), [children])

  useEffect(() => {
    if (!stackRef.current || !cards.length) return undefined

    const ctx = gsap.context(() => {
      const items = Array.from(stackRef.current.querySelectorAll('.card-swap__item'))
      if (!items.length) return

      let slots = items.map((_, index) => ({
        y: index * verticalDistance,
        z: -index * cardDistance,
        scale: 1 - index * 0.05,
        opacity: index > 2 ? 0 : 1 - index * 0.18,
      }))

      const applySlots = (instant = false) => {
        items.forEach((item, index) => {
          const slot = slots[index]
          if (instant) {
            gsap.set(item, slot)
          } else {
            gsap.to(item, {
              ...slot,
              duration: 0.85,
              ease: 'power3.inOut',
            })
          }
        })
      }

      const rotateSlots = () => {
        slots = [...slots.slice(1), slots[0]]
      }

      applySlots(true)

      let intervalId = null
      const runCycle = () => {
        rotateSlots()
        applySlots()
      }

      const startLoop = () => {
        if (intervalId) return
        intervalId = setInterval(runCycle, delay)
      }

      const stopLoop = () => {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      }

      controlsRef.current = {
        start: startLoop,
        stop: stopLoop,
      }

      startLoop()
      const kickOff = setTimeout(runCycle, 250)

      return () => {
        clearTimeout(kickOff)
        stopLoop()
      }
    }, stackRef)

    return () => {
      controlsRef.current.stop?.()
      ctx.revert()
    }
  }, [cards, cardDistance, verticalDistance, delay])

  useEffect(() => {
    return () => {
      controlsRef.current.stop?.()
    }
  }, [])

  const handleEnter = () => {
    if (!pauseOnHover) return
    controlsRef.current.stop?.()
  }

  const handleLeave = () => {
    if (!pauseOnHover) return
    controlsRef.current.start?.()
  }

  return (
    <div className="card-swap" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="card-swap__stack" ref={stackRef}>
        {cards.map((card, index) => (
          <div className="card-swap__item" key={index}>
            {cloneElement(card)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardSwap