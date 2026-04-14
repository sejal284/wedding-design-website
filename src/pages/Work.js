import { createElement } from 'react'
import { Link } from 'react-router-dom'

const caseStudies = [
  {
    title: 'Royal Heritage Wedding',
    description: 'Timeless motifs and regal detailing crafted into a unified guest journey.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Modern Minimal Romance',
    description: 'Clean aesthetics with intentional typography for a contemporary celebration.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Garden Soiree Celebration',
    description: 'Soft botanicals and editorial layouts designed for an elegant outdoor story.',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80',
  },
]

function Work() {
  const cards = caseStudies.map((study) =>
    createElement(
      'article',
      {
        key: study.title,
        className:
          'motion-card group relative h-[420px] overflow-hidden rounded-xl border border-[#5a0f0f]/10 shadow-lg hover:-translate-y-1.5 hover:shadow-2xl',
      },
      createElement('div', {
        className:
          'absolute inset-0 scale-100 bg-cover bg-center transition duration-300 group-hover:scale-105',
        style: {
          backgroundImage: `url(${study.image})`,
        },
      }),
      createElement('div', {
        className:
          'absolute inset-0 bg-gradient-to-t from-[#180606]/92 via-[#260a0a]/45 to-transparent',
      }),
      createElement(
        'div',
        {
          className: 'absolute inset-x-0 bottom-0 z-10 p-7',
        },
        createElement(
          'h3',
          {
            className: "font-['Playfair_Display'] text-3xl font-semibold leading-tight text-white",
          },
          study.title,
        ),
        createElement(
          'p',
          {
            className: 'mt-3 text-sm text-white/78',
          },
          study.description,
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
          'Our Work',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-white/80 sm:text-lg',
          },
          'Every wedding we design is built as a complete visual story — not just individual pieces.',
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
          className: 'mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3',
        },
        ...cards,
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
          className: 'mx-auto flex max-w-4xl flex-col items-center',
        },
        createElement(
          'h2',
          {
            className:
              "font-['Playfair_Display'] text-5xl font-semibold leading-tight tracking-[-0.02em] sm:text-6xl",
          },
          'Let’s Create Something Unique for Your Wedding',
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

export default Work
