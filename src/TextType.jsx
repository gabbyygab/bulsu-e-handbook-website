import { useMemo } from 'react'

const TextType = ({
  text = [],
  typingSpeed = 80,
  pauseDuration = 1200,
  showCursor = true,
  cursorCharacter = '|',
}) => {
  const phrases = useMemo(
    () => (text && text.length ? text.filter(Boolean) : ['Text typing effect']),
    [text],
  )

  // Calculate total cycle duration for all phrases
  const totalCycleTime = phrases.reduce((total, phrase) => {
    const chars = phrase.length
    const typingTime = chars * typingSpeed
    const pauseTime = pauseDuration
    const deletingTime = chars * (typingSpeed / 1.5)
    return total + typingTime + pauseTime + deletingTime + (typingSpeed * 2)
  }, 0)

  return (
    <span className="text-type" aria-live="polite" style={{ '--total-cycle': `${totalCycleTime}ms` }}>
      {phrases.map((phrase, index) => {
        const chars = phrase.length
        const typingTime = chars * typingSpeed
        const pauseTime = pauseDuration
        const deletingTime = chars * (typingSpeed / 1.5)
        const phraseDuration = typingTime + pauseTime + deletingTime
        
        // Calculate delay based on previous phrases
        let delay = 0
        for (let i = 0; i < index; i++) {
          const prevChars = phrases[i].length
          delay += prevChars * typingSpeed + pauseDuration + prevChars * (typingSpeed / 1.5) + (typingSpeed * 2)
        }

        return (
          <span
            key={index}
            className="text-type__phrase"
            style={{
              '--phrase': `"${phrase}"`,
              '--chars': chars,
              '--typing-time': `${typingTime}ms`,
              '--pause-time': `${pauseTime}ms`,
              '--deleting-time': `${deletingTime}ms`,
              '--phrase-duration': `${phraseDuration}ms`,
              '--delay': `${delay}ms`,
            }}
          >
            <span className="text-type__content"></span>
          </span>
        )
      })}
      {showCursor && (
        <span className="text-type__cursor">{cursorCharacter}</span>
      )}
    </span>
  )
}

export default TextType
