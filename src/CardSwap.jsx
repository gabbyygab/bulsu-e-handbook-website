import { Children, cloneElement, useMemo } from 'react'

export const Card = ({ children }) => <div className="card-swap__card">{children}</div>

const CardSwap = ({
  children,
  cardDistance = 50,
  verticalDistance = 60,
  delay = 4000,
  pauseOnHover = true,
}) => {
  const cards = useMemo(() => Children.toArray(children).filter(Boolean), [children])

  return (
    <div 
      className="card-swap" 
      style={{
        '--card-distance': `${cardDistance}px`,
        '--vertical-distance': `${verticalDistance}px`,
        '--animation-delay': `${delay}ms`,
        '--pause-on-hover': pauseOnHover ? 'paused' : 'running',
      }}
    >
      <div className="card-swap__stack">
        {cards.map((card, index) => (
          <div 
            className="card-swap__item" 
            key={index}
            style={{
              '--card-index': index,
              '--total-cards': cards.length,
            }}
          >
            {cloneElement(card)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardSwap
