import { createElement } from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#5a0f0f] px-6 py-24 text-center text-white sm:px-8',
    },
    createElement(
      'div',
      {
        className: 'mx-auto flex max-w-4xl flex-col items-center',
      },
      createElement(
        'h2',
        {
          className:
            "font-['Playfair_Display'] text-6xl font-semibold leading-[0.95] tracking-[-0.02em] sm:text-7xl",
        },
        'Ready to Start Your Wedding Design?',
      ),
      createElement(
        'p',
        {
          className: 'mt-6 max-w-3xl text-base leading-relaxed text-white/78 sm:text-lg',
        },
        'Let’s create something intentional, cohesive, and truly yours.',
      ),
      createElement(
        Link,
        {
          to: '/contact',
          className:
            'motion-button mt-10 inline-flex items-center justify-center rounded-full bg-red-600 px-12 py-4 text-base font-bold tracking-[0.08em] text-white shadow-lg hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_16px_30px_rgba(220,38,38,0.28)]',
        },
        'Book a Consultation',
      ),
    ),
  )
}

export default CTA
