import { createElement } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Wedding Branding',
    description:
      'A complete visual identity for your wedding — including colors, typography, and design language that ties everything together.',
    image:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0f6a6?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Digital Collaterals',
    description:
      'E-invites, save-the-dates, and itineraries designed for modern sharing.',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Event Stationery',
    description:
      'Menus, welcome boards, and signage that enhance your guest experience.',
    image:
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Planner Design Support',
    description:
      'White-label design services for wedding planners who need a reliable creative partner.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
  },
]

function ServicesPage() {
  const serviceBlocks = services.map((service, index) => {
    const isReverse = index % 2 === 1

    return createElement(
      'article',
      {
        key: service.title,
        className:
          'motion-card border-b border-[#5a0f0f]/15 py-14 last:border-b-0 md:py-16',
      },
      createElement(
        'div',
        {
          className: `flex flex-col items-center gap-10 ${
            isReverse ? 'md:flex-row-reverse' : 'md:flex-row'
          } md:gap-14`,
        },
        createElement(
          'div',
          {
            className: 'w-full md:w-1/2',
          },
          createElement(
            'h2',
            {
              className:
                "font-['Playfair_Display'] text-4xl font-semibold leading-tight text-[#5a0f0f] sm:text-5xl",
            },
            service.title,
          ),
          createElement(
            'p',
            {
              className: 'mt-6 max-w-xl text-base leading-relaxed text-[#5a0f0f]/70',
            },
            service.description,
          ),
        ),
        createElement(
          'div',
          {
            className:
              'group relative h-[360px] w-full overflow-hidden rounded-xl border border-[#5a0f0f]/10 shadow-lg md:w-1/2',
          },
          createElement('div', {
            className:
              'absolute inset-0 scale-100 bg-cover bg-center transition duration-300 group-hover:scale-105',
            style: {
              backgroundImage: `url(${service.image})`,
            },
          }),
          createElement('div', {
            className:
              'absolute inset-0 bg-gradient-to-t from-[#180606]/85 via-[#2a0d0d]/35 to-transparent',
          }),
          createElement(
            'p',
            {
              className:
                'absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85',
            },
            'Design Preview',
          ),
        ),
      ),
    )
  })

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
          'What We Design',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-white/80 sm:text-lg',
          },
          'From your first invite to your final event signage, every detail is designed to feel consistent and intentional.',
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
          className: 'mx-auto max-w-6xl',
        },
        ...serviceBlocks,
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
          'Not Sure What You Need?',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-base leading-relaxed text-white/78 sm:text-lg',
          },
          'We’ll guide you based on your wedding, your style, and your budget.',
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

export default ServicesPage
