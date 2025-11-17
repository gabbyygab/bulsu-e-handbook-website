import { useEffect, useMemo, useState } from 'react'

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
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!phrases.length) return

    const currentPhrase = phrases[phraseIndex % phrases.length]
    let timeout

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseDuration)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }, typingSpeed)
    } else {
      const nextLength = displayText.length + (isDeleting ? -1 : 1)
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, nextLength))
      }, isDeleting ? typingSpeed / 1.5 : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, pauseDuration])

  useEffect(() => {
    setDisplayText('')
    setPhraseIndex(0)
    setIsDeleting(false)
  }, [phrases])

  return (
    <span className="text-type" aria-live="polite">
      <span className="text-type__content">{displayText}</span>
      {showCursor && <span className="text-type__cursor">{cursorCharacter}</span>}
    </span>
  )
}

export default TextType

