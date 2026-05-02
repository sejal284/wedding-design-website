import { createElement } from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return createElement(
    'section',
    {
      className:
        'scroll-reveal relative overflow-hidden bg-[#5a0f0f] px-6 py-24 text-center text-white sm:px-8 sm:py-28 md:py-32',
    },
    createElement('div', {
      className:
        'pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20',
    }),
    createElement('div', {
      className:
        'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_56%)]',
    }),
    createElement(
      'div',
      {
        className:
          'animate-fade-in-up relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 md:gap-14',
      },
      createElement(
        'h1',
        {
          className:
            "font-['Playfair_Display'] text-6xl font-semibold leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl lg:text-[6.5rem]",
        },
        'Wedding Design Partner for Planners & Modern Couples',
      ),
      createElement(
        'p',
        {
          className:
            'max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl',
        },
        'We create cohesive, custom wedding branding — from invitations to event collaterals.',
      ),
      createElement(
        'div',
        {
          className:
            'flex w-full max-w-xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6',
        },
        createElement(
          Link,
          {
            to: '/contact',
            className:
              'motion-button inline-flex w-full items-center justify-center rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold tracking-wide text-white hover:-translate-y-0.5 hover:bg-red-500 sm:w-auto',
          },
          'Book a Consultation',
        ),
        createElement(
          Link,
          {
            to: '/work',
            className:
              'motion-button inline-flex w-full items-center justify-center rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold tracking-wide text-white hover:-translate-y-0.5 hover:bg-white hover:text-[#5a0f0f] sm:w-auto',
          },
          'View Our Work',
        ),
      ),
    ),
  )
}

export default Hero
