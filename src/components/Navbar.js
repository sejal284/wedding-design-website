import { Link, useLocation } from 'react-router-dom'
import { createElement, useState } from 'react'

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Our Work', to: '/work' },
  { label: 'What We Make', to: '/services' },
  { label: 'How It Works', to: '/process' },
  { label: 'About', to: '/about' },
]

const linkBaseClass =
  'motion-button text-sm font-medium tracking-wide text-white/90 hover:text-white'

const ctaClass =
  'motion-button inline-flex items-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const desktopLinkClass = (to) =>
    `${linkBaseClass} ${
      isActive(to)
        ? 'border-b-2 border-[#f3e6c9] pb-1 text-[#f3e6c9]'
        : 'border-b-2 border-transparent'
    }`

  const mobileLinkClass = (to) =>
    `motion-button block rounded-lg px-3 py-2 text-sm font-medium ${
      isActive(to)
        ? 'bg-[#f3e6c9] text-[#5a0f0f]'
        : 'text-white/90 hover:bg-white/10 hover:text-white'
    }`

  const contactCtaClass = isActive('/contact')
    ? `${ctaClass} ring-2 ring-[#f3e6c9]/70`
    : ctaClass

  const desktopLinks = menuItems.map((item) =>
    createElement(
      Link,
      {
        key: `desktop-${item.to}`,
        to: item.to,
        className: desktopLinkClass(item.to),
      },
      item.label,
    ),
  )

  const mobileLinks = menuItems.map((item) =>
    createElement(
      Link,
      {
        key: `mobile-${item.to}`,
        to: item.to,
        className: mobileLinkClass(item.to),
        onClick: () => setIsOpen(false),
      },
      item.label,
    ),
  )

  return createElement(
    'header',
    {
      className: 'sticky top-0 z-50 bg-[#5a0f0f] text-white shadow-md',
    },
    createElement(
      'nav',
      {
        className: 'mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8',
      },
      createElement(
        Link,
        {
          to: '/',
          className:
            "font-['Playfair_Display'] text-2xl font-semibold tracking-wide text-white transition duration-200 hover:text-white/90",
        },
        'Lil Details',
      ),
      createElement(
        'div',
        {
          className: 'hidden items-center gap-6 md:flex',
        },
        ...desktopLinks,
        createElement(
          Link,
          {
            to: '/contact',
            className: contactCtaClass,
          },
          'Book a Consultation',
        ),
      ),
      createElement(
        'button',
        {
          type: 'button',
          className:
            'motion-button rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 md:hidden',
          onClick: () => setIsOpen((prev) => !prev),
          'aria-expanded': isOpen,
          'aria-label': 'Toggle menu',
        },
        isOpen ? 'Close' : 'Menu',
      ),
    ),
    isOpen &&
      createElement(
        'div',
        {
          className: 'border-t border-white/20 px-5 pb-4 md:hidden',
        },
        createElement(
          'div',
          {
            className: 'flex flex-col gap-1 pt-3',
          },
          ...mobileLinks,
          createElement(
            Link,
            {
              to: '/contact',
              className: `${contactCtaClass} mt-2 justify-center`,
              onClick: () => setIsOpen(false),
            },
            'Book a Consultation',
          ),
        ),
      ),
  )
}

export default Navbar
