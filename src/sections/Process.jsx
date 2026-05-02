import { createElement } from 'react'

const steps = [
  {
    title: 'Tell Us Your Story',
    description:
      'Share your vision, wedding style, and the moments you want every design detail to reflect.',
  },
  {
    title: 'Discovery Call',
    description:
      'We align on priorities, timeline, and guest-facing touchpoints in a focused strategy call.',
  },
  {
    title: 'Custom Proposal',
    description:
      'Receive a tailored scope with creative direction, deliverables, and investment options.',
  },
  {
    title: 'Design & Delivery',
    description:
      'From concept to final files and print-ready assets, everything is crafted with polished consistency.',
  },
]

function Process() {
  const items = steps.map((step, index) =>
    createElement(
      'article',
      {
        key: step.title,
        className:
          'motion-card group relative z-10 flex-1 rounded-3xl border border-[#5a0f0f]/10 bg-white p-7 shadow-lg hover:-translate-y-1.5 hover:border-[#5a0f0f]/20 hover:shadow-2xl sm:p-8',
      },
      createElement(
        'span',
        {
          className:
            'inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#5a0f0f] text-lg font-semibold text-white shadow-md transition duration-300 group-hover:scale-105',
        },
        String(index + 1).padStart(2, '0'),
      ),
      createElement(
        'h3',
        {
          className:
            "mt-7 font-['Playfair_Display'] text-[2.15rem] font-semibold leading-[1] text-[#5a0f0f]",
        },
        step.title,
      ),
      createElement(
        'p',
        {
          className: 'mt-5 text-sm leading-relaxed text-[#5a0f0f]/65 sm:text-base',
        },
        step.description,
      ),
    ),
  )

  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#f1e4cd] px-6 py-24 sm:px-8',
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
          'How It Works',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-sm leading-relaxed text-[#5a0f0f]/65 sm:text-base',
          },
          'A guided, collaborative process designed for planners and modern couples.',
        ),
      ),
      createElement(
        'div',
        {
          className: 'relative mt-14 flex flex-col gap-8 lg:flex-row lg:gap-10',
        },
        createElement('div', {
          className:
            'pointer-events-none absolute left-12 right-12 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#5a0f0f]/30 to-transparent lg:block',
        }),
        ...items,
      ),
    ),
  )
}

export default Process
