import { useRef, useEffect, useState } from 'react'

const TiltedCard = ({
  imageSrc,
  altText = '',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '300px',
  imageWidth = '300px',
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent = null,
}) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -rotateAmplitude
      const rotateY = ((x - centerX) / centerX) * rotateAmplitude

      setTransform({
        rotateX,
        rotateY,
        scale: scaleOnHover,
      })
    }

    const handleMouseLeave = () => {
      setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [rotateAmplitude, scaleOnHover])

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <div
      ref={cardRef}
      className="tilted-card"
      style={{
        width: containerWidth,
        height: containerHeight,
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        transition: isHovered ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      <div className="tilted-card__inner">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={altText}
            className="tilted-card__image"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        )}
        {displayOverlayContent && overlayContent && (
          <div className="tilted-card__overlay">{overlayContent}</div>
        )}
        {captionText && !displayOverlayContent && (
          <div className="tilted-card__caption">{captionText}</div>
        )}
        {showTooltip && isHovered && (
          <div className="tilted-card__tooltip">Hover to tilt</div>
        )}
        {showMobileWarning && isMobile && (
          <div className="tilted-card__mobile-warning">
            Tilt effect works best on desktop
          </div>
        )}
      </div>
    </div>
  )
}

export default TiltedCard

