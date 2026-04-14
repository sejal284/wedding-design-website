import { createElement } from 'react'

const themes = [
  {
    title: 'Royal Heritage Wedding',
    description:
      'A regal visual direction inspired by heirloom motifs, rich textures, and timeless ceremonial elegance.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Modern Minimal Romance',
    description:
      'Clean typography, refined neutrals, and intentional details designed for contemporary couples.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Garden Soiree Celebration',
    description:
      'A soft editorial look with botanical accents, romantic palettes, and elevated print storytelling.',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80',
  },
]

function Portfolio() {
  const cards = themes.map((theme) =>
    createElement(
      'article',
      {
        key: theme.title,
        className:
          'motion-card group relative h-[34rem] overflow-hidden rounded-3xl border border-[#5a0f0f]/10 bg-[#ead8b0] shadow-lg hover:-translate-y-1.5 hover:shadow-2xl sm:h-[38rem]',
      },
      createElement('div', {
        className:
          'absolute inset-0 scale-100 bg-cover bg-center transition duration-700 group-hover:scale-105',
        style: {
          backgroundImage: `url(${theme.image})`,
        },
      }),
      createElement(
        'div',
        {
          className:
            'absolute inset-0 bg-gradient-to-t from-[#140505]/90 via-[#2b0e0e]/45 to-transparent',
        },
      ),
      createElement(
        'div',
        {
          className:
            'absolute left-5 top-5 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm',
        },
        'Theme Visual',
      ),
      createElement(
        'div',
        {
          className: 'absolute inset-x-0 bottom-0 z-10 p-7 sm:p-8',
        },
        createElement(
          'h3',
          {
            className:
              "font-['Playfair_Display'] text-4xl font-semibold leading-[0.98] text-white sm:text-[2.6rem]",
          },
          theme.title,
        ),
        createElement(
          'p',
          {
            className: 'mt-5 text-sm leading-relaxed text-white/78 sm:text-base',
          },
          theme.description,
        ),
      ),
    ),
  )

  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#fff8ee] px-6 py-24 sm:px-8',
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
          'Featured Wedding Themes',
        ),
        createElement(
          'p',
          {
            className: 'mt-6 text-sm leading-relaxed text-[#5a0f0f]/65 sm:text-base',
          },
          'Explore signature design directions curated as premium wedding case studies.',
        ),
      ),
      createElement(
        'div',
        {
          className: 'mt-12 grid grid-cols-1 gap-7 md:grid-cols-3',
        },
        ...cards,
      ),
    ),
  )
}

export default Portfolio
