import { createElement } from 'react'

const testimonials = [
  {
    quote:
      'Every touchpoint felt intentional and elevated. The stationery and digital suite looked like a luxury editorial spread.',
    author: 'Aisha & Karan',
    role: 'Couple',
  },
  {
    quote:
      'As a planner, I finally found a design partner who understands pacing, detail, and cohesion across the entire guest journey.',
    author: 'Rhea Mehta',
    role: 'Wedding Planner',
  },
]

function Testimonials() {
  const cards = testimonials.map((item) =>
    createElement(
      'article',
      {
        key: item.author,
        className:
          'motion-card rounded-3xl border border-[#5a0f0f]/10 bg-white p-8 shadow-lg hover:-translate-y-1 hover:shadow-2xl sm:p-10',
      },
      createElement(
        'p',
        {
          className:
            "font-['Playfair_Display'] text-[2.05rem] leading-[1.35] text-[#5a0f0f] sm:text-[2.45rem]",
        },
        `“${item.quote}”`,
      ),
      createElement(
        'p',
        {
          className: 'mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[#5a0f0f]/80',
        },
        item.author,
      ),
      createElement(
        'p',
        {
          className: 'mt-2 text-sm text-[#5a0f0f]/58',
        },
        item.role,
      ),
    ),
  )

  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#fff3e4] px-6 py-24 sm:px-8',
    },
    createElement(
      'div',
      {
        className: 'mx-auto max-w-6xl',
      },
      createElement(
        'div',
        {
          className: 'mx-auto max-w-3xl text-center',
        },
        createElement(
          'h2',
          {
            className:
              "font-['Playfair_Display'] text-6xl font-semibold tracking-[0.02em] text-[#5a0f0f] sm:text-7xl",
          },
          'Client Praise',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-sm leading-relaxed text-[#5a0f0f]/65 sm:text-base',
          },
          'Trusted by planners and modern couples for refined wedding design experiences.',
        ),
      ),
      createElement(
        'div',
        {
          className: 'mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2',
        },
        ...cards,
      ),
    ),
  )
}

export default Testimonials
