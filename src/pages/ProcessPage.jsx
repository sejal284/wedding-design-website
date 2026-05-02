import { createElement } from 'react'
import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Story',
    description:
      'Fill out a short form so we understand your vision, preferences, and requirements.',
  },
  {
    number: '02',
    title: 'Discovery Call',
    description:
      'We discuss your ideas, share references, and align on direction.',
  },
  {
    number: '03',
    title: 'Custom Proposal',
    description:
      'You receive a clear plan, deliverables, timeline, and pricing within 24–48 hours.',
  },
  {
    number: '04',
    title: 'Design & Delivery',
    description:
      'We design, refine with you, and deliver everything ready for use.',
  },
]

function ProcessPage() {
  const timelineSteps = steps.map((step) =>
    createElement(
      'article',
      {
        key: step.number,
        className:
          'motion-card relative flex gap-7 rounded-2xl border border-[#5a0f0f]/12 bg-white/60 p-6 transition duration-300 hover:border-[#5a0f0f]/25 hover:bg-white/80 hover:shadow-lg sm:gap-10 sm:p-8',
      },
      createElement(
        'div',
        {
          className: 'w-16 shrink-0 text-center sm:w-20',
        },
        createElement(
          'span',
          {
            className:
              "font-['Playfair_Display'] text-4xl font-bold leading-none text-[#5a0f0f] sm:text-5xl",
          },
          step.number,
        ),
      ),
      createElement(
        'div',
        {
          className: 'flex-1',
        },
        createElement(
          'h2',
          {
            className:
              "font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#5a0f0f] sm:text-4xl",
          },
          step.title,
        ),
        createElement(
          'p',
          {
            className: 'mt-4 max-w-2xl text-base leading-relaxed text-[#5a0f0f]/70',
          },
          step.description,
        ),
      ),
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
          'How It Works',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-white/80 sm:text-lg',
          },
          'A simple, structured process designed to keep your wedding design stress-free.',
        ),
        createElement(
          'p',
          {
            className: 'mt-4 text-sm font-medium tracking-wide text-white/90 sm:text-base',
          },
          'Most weddings are completed within 2–4 weeks.',
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
          className: 'mx-auto max-w-5xl',
        },
        createElement(
          'div',
          {
            className: 'relative space-y-6 sm:space-y-8',
          },
          createElement('div', {
            className:
              'pointer-events-none absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-[#5a0f0f]/0 via-[#5a0f0f]/30 to-[#5a0f0f]/0 sm:left-10',
          }),
          ...timelineSteps,
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
          'Ready to Get Started?',
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

export default ProcessPage
