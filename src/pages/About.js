import { createElement } from 'react'
import { Link } from 'react-router-dom'

const differentiators = [
  {
    title: 'Story-Driven',
    description: 'We design around your story, not templates.',
  },
  {
    title: 'Intentional Process',
    description: 'Every design decision has a reason behind it.',
  },
  {
    title: 'Limited Projects',
    description: 'We take on a small number of weddings to maintain quality.',
  },
  {
    title: 'Clear Communication',
    description: 'No confusion, no guesswork — just clarity.',
  },
]

const plannerPoints = [
  'Fast turnaround',
  'Scalable for multiple weddings',
  'Consistent branding',
  'Dedicated design support',
]

function About() {
  const diffBlocks = differentiators.map((item) =>
    createElement(
      'article',
      {
        key: item.title,
        className:
          'motion-card rounded-2xl border border-[#5a0f0f]/12 bg-white/70 p-8 shadow-md hover:-translate-y-1 hover:shadow-xl sm:p-9',
      },
      createElement(
        'h3',
        {
          className:
            "font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#5a0f0f] sm:text-4xl",
        },
        item.title,
      ),
      createElement(
        'p',
        {
          className: 'mt-5 text-base leading-relaxed text-[#5a0f0f]/68',
        },
        item.description,
      ),
    ),
  )

  const plannerItems = plannerPoints.map((point) =>
    createElement(
      'li',
      {
        key: point,
        className: 'flex items-center gap-3 text-base text-[#5a0f0f]/75',
      },
      createElement('span', {
        className:
          'inline-block h-2.5 w-2.5 rounded-full bg-[#5a0f0f] shadow-[0_0_0_4px_rgba(90,15,15,0.12)]',
      }),
      point,
    ),
  )

  return createElement(
    'main',
    null,
    createElement(
      'section',
      {
        className: 'bg-[#5a0f0f] px-6 py-28 text-center text-white sm:px-8',
      },
      createElement(
        'div',
        {
          className: 'mx-auto max-w-3xl',
        },
        createElement(
          'h1',
          {
            className:
              "font-['Playfair_Display'] text-6xl font-semibold leading-tight tracking-[-0.02em] sm:text-7xl",
          },
          'About Lil Details',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-white/80 sm:text-lg',
          },
          'We don’t just design wedding collaterals — we design how your wedding feels.',
        ),
      ),
    ),
    createElement(
      'section',
      {
        className: 'bg-[#f3e6c9] px-6 py-24 sm:px-8',
      },
      createElement(
        'div',
        {
          className: 'mx-auto max-w-4xl text-center',
        },
        createElement(
          'p',
          {
            className:
              "font-['Playfair_Display'] text-3xl leading-relaxed text-[#5a0f0f] sm:text-[2.2rem]",
          },
          'Lil Details was built on a simple observation — beautiful weddings often end up with forgettable design.',
        ),
        createElement(
          'p',
          {
            className: 'mt-8 text-base leading-relaxed text-[#5a0f0f]/70 sm:text-lg',
          },
          'We focus on the details that most people overlook, but guests remember.',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-[#5a0f0f]/70 sm:text-lg',
          },
          'Every project we take on is intentional, personal, and built from scratch.',
        ),
      ),
      createElement(
        'div',
        {
          className: 'mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2',
        },
        ...diffBlocks,
      ),
    ),
    createElement(
      'section',
      {
        className: 'bg-[#efe0c3] px-6 py-24 sm:px-8',
      },
      createElement(
        'div',
        {
          className: 'mx-auto max-w-5xl rounded-2xl border border-[#5a0f0f]/12 bg-white/75 p-9 shadow-lg sm:p-12',
        },
        createElement(
          'h2',
          {
            className:
              "font-['Playfair_Display'] text-5xl font-semibold leading-tight text-[#5a0f0f] sm:text-6xl",
          },
          'For Wedding Planners',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 max-w-3xl text-base leading-relaxed text-[#5a0f0f]/72 sm:text-lg',
          },
          'We partner with wedding planners to provide reliable, white-label design support.',
        ),
        createElement(
          'ul',
          {
            className: 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2',
          },
          ...plannerItems,
        ),
        createElement(
          Link,
          {
            to: '/contact',
            className:
              'motion-button mt-10 inline-flex items-center justify-center rounded-full bg-[#5a0f0f] px-9 py-3.5 text-sm font-bold tracking-[0.08em] text-white shadow-md hover:-translate-y-1 hover:bg-[#741515]',
          },
          'Become a Partner',
        ),
      ),
    ),
    createElement(
      'section',
      {
        className: 'bg-[#5a0f0f] px-6 py-24 text-center text-white sm:px-8',
      },
      createElement(
        'div',
        {
          className: 'mx-auto max-w-3xl',
        },
        createElement(
          'h2',
          {
            className:
              "font-['Playfair_Display'] text-5xl font-semibold leading-tight tracking-[-0.02em] sm:text-6xl",
          },
          'Let’s Create Something That Stands Out',
        ),
        createElement(
          Link,
          {
            to: '/contact',
            className:
              'motion-button mt-10 inline-flex items-center justify-center rounded-full bg-red-600 px-10 py-4 text-base font-bold tracking-[0.08em] text-white shadow-lg hover:-translate-y-1 hover:bg-red-500',
          },
          'Book a Consultation',
        ),
      ),
    ),
  )
}

export default About
