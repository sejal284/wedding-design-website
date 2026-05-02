import { createElement } from 'react'

const services = [
  {
    icon: 'WB',
    title: 'Wedding Branding',
    description:
      'Custom visual identity systems tailored to your event story, style, and guest experience.',
  },
  {
    icon: 'DC',
    title: 'Digital Collaterals',
    description:
      'Elegant digital assets including save-the-date graphics, web details, and social announcement kits.',
  },
  {
    icon: 'ES',
    title: 'Event Stationery',
    description:
      'Thoughtful printed suites from invitations to menus, table details, and on-day signage.',
  },
  {
    icon: 'PS',
    title: 'Planner Design Support',
    description:
      'Reliable design partnership for planners who need consistent, high-touch visuals across every touchpoint.',
  },
]

function Services() {
  const cards = services.map((service) =>
    createElement(
      'article',
      {
        key: service.title,
        className:
          'motion-card group relative overflow-hidden rounded-2xl border border-[#5a0f0f]/12 bg-white p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl sm:p-12',
      },
      createElement('div', {
        className:
          'absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#5a0f0f] via-[#8b2929] to-[#5a0f0f]/70',
      }),
      createElement('div', {
        className: 'absolute bottom-8 left-0 top-8 w-[3px] rounded-full bg-[#5a0f0f]/16',
      }),
      createElement(
        'span',
        {
          className:
            'inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#5a0f0f]/20 bg-[#f9efe1] text-xs font-semibold tracking-[0.16em] text-[#5a0f0f]',
        },
        service.icon,
      ),
      createElement(
        'h3',
        {
          className:
            "mt-7 font-['Playfair_Display'] text-[2rem] font-semibold leading-tight text-[#5a0f0f]",
        },
        service.title,
      ),
      createElement(
        'p',
        {
          className: 'mt-5 text-sm leading-relaxed text-[#5a0f0f]/68 sm:text-base',
        },
        service.description,
      ),
    ),
  )

  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#f3e6c9] px-6 py-24 sm:px-8',
    },
    createElement(
      'div',
      {
        className: 'mx-auto max-w-6xl',
      },
      createElement(
        'h2',
        {
          className:
            "text-center font-['Playfair_Display'] text-6xl font-semibold tracking-[0.02em] text-[#5a0f0f] sm:text-7xl",
        },
        'Our Services',
      ),
      createElement(
        'div',
        {
          className: 'mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12',
        },
        ...cards,
      ),
    ),
  )
}

export default Services
