import { createElement, useEffect } from 'react'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Portfolio from '../sections/Portfolio'
import Process from '../sections/Process'
import Testimonials from '../sections/Testimonials'
import CTA from '../sections/CTA'

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('.page-flow .scroll-reveal')

    if (!sections.length) {
      return undefined
    }

    const revealAll = () => {
      sections.forEach((section) => section.classList.add('in-view'))
    }

    // Fail-safe so content never stays hidden if observer setup fails.
    const fallbackTimer = window.setTimeout(revealAll, 1200)

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealAll()
      return () => window.clearTimeout(fallbackTimer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.clearTimeout(fallbackTimer)
    }
  }, [])

  return createElement(
    'main',
    {
      className: 'page-flow',
    },
    createElement(Hero),
    createElement(Services),
    createElement(Portfolio),
    createElement(Process),
    createElement(Testimonials),
    createElement(CTA),
  )
}

export default Home
