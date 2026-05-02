import { createElement } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return createElement(
    'footer',
    {
      className: 'bg-[#5a0f0f] px-6 py-12 text-white sm:px-8 sm:py-14',
    },
    createElement(
      'div',
      {
        className: 'mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3',
      },
      createElement(
        'div',
        null,
        createElement(
          'h3',
          {
            className: "font-['Playfair_Display'] text-4xl font-semibold leading-tight",
          },
          'Lil Details',
        ),
        createElement(
          'p',
          {
            className: 'mt-5 max-w-sm text-sm leading-relaxed text-white/72',
          },
          'Luxury wedding branding and collateral design for planners and modern couples who value cohesive details.',
        ),
        createElement(
          Link,
          {
            to: '/contact',
            className:
              'motion-button mt-6 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500',
          },
          'Book Your Consultation',
        ),
      ),
      createElement(
        'div',
        null,
        createElement(
          'h4',
          {
            className: 'text-sm font-semibold uppercase tracking-[0.16em] text-white/90',
          },
          'Quick Links',
        ),
        createElement(
          'div',
          {
            className: 'mt-4 flex flex-col gap-2 text-sm',
          },
          createElement(
            Link,
            {
              to: '/',
              className: 'motion-button text-white/80 hover:text-white',
            },
            'Home',
          ),
          createElement(
            Link,
            {
              to: '/work',
              className: 'motion-button text-white/80 hover:text-white',
            },
            'Our Work',
          ),
          createElement(
            Link,
            {
              to: '/services',
              className: 'motion-button text-white/80 hover:text-white',
            },
            'What We Make',
          ),
          createElement(
            Link,
            {
              to: '/process',
              className: 'motion-button text-white/80 hover:text-white',
            },
            'How It Works',
          ),
          createElement(
            Link,
            {
              to: '/about',
              className: 'motion-button text-white/80 hover:text-white',
            },
            'About',
          ),
        ),
      ),
      createElement(
        'div',
        null,
        createElement(
          'h4',
          {
            className: 'text-sm font-semibold uppercase tracking-[0.16em] text-white/90',
          },
          'Contact Info',
        ),
        createElement(
          'div',
          {
            className: 'mt-4 flex flex-col gap-3 text-sm text-white/80',
          },
          createElement('p', null, 'hello@lildetails.design'),
          createElement('p', null, '+1 (555) 832-1947'),
          createElement('p', null, 'Available Mon - Sat, 10:00 AM - 6:00 PM'),
          createElement('p', null, 'Based in Mumbai, serving clients worldwide'),
        ),
      ),
    ),
    // Bottom admin access strip
    createElement(
      'div',
      {
        className: 'mt-8 border-t border-white/10 pt-4',
      },
      createElement(
        'div',
        {
          className:
            'mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-0 text-xs text-white/60 sm:flex-row sm:px-6',
        },
        createElement(
          'p',
          {
            className: 'text-xs text-white/60',
          },
          '© 2026 Lil Details. All rights reserved.',
        ),
        createElement(
          Link,
          {
            to: '/admin',
            className:
              'text-xs text-white/60 hover:text-white/90 transition-opacity duration-150',
            'aria-hidden': true,
          },
          'Internal Access',
        ),
      ),
    ),
  )
}

export default Footer
