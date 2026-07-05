import { useState, useEffect } from 'react'
import styles from './BackToTop.module.css'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!visible) return null

  return (
    <button className={styles.btn} onClick={scrollTop}>
        ∧
    </button>
  )
}

export default BackToTop