import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createElement, useState, useEffect, useRef } from 'react'
import logo from '../assets/lillogo.png'

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
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

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

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setIsDropdownOpen(false)
    setIsOpen(false)
    navigate('/login')
  }

  const handleBookConsultation = () => {
    if (user) {
      navigate('/contact')
    } else {
      setIsAuthModalOpen(true)
    }
  }

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

  // Desktop authenticated profile dropdown
  const desktopProfileDropdown = user
    ? createElement(
        'div',
        {
          ref: dropdownRef,
          className: 'relative',
        },
        createElement(
          'button',
          {
            onClick: () => setIsDropdownOpen(!isDropdownOpen),
            className:
              'motion-button flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e6c9] text-sm font-bold text-[#5a0f0f] transition-all duration-200 hover:bg-[#e8dab8] focus:outline-none focus:ring-2 focus:ring-[#f3e6c9]/50',
            type: 'button',
            'aria-expanded': isDropdownOpen,
            title: `${user.fullName || 'User'}`,
          },
          user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U',
        ),
        isDropdownOpen &&
          createElement(
            'div',
            {
              className:
                'motion-button absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl bg-[#f3e6c9] py-1 shadow-2xl ring-1 ring-[#5a0f0f]/20',
            },
            createElement(
              'div',
              {
                className: 'border-b border-[#5a0f0f]/10 px-4 py-3',
              },
              createElement(
                'div',
                {
                  className: 'text-xs font-semibold uppercase tracking-wide text-[#5a0f0f]/70',
                },
                'Welcome back',
              ),
              createElement(
                'div',
                {
                  className: 'mt-1 text-sm font-bold text-[#5a0f0f]',
                },
                user.fullName || 'User',
              ),
            ),
            createElement(
              Link,
              {
                to: '/dashboard',
                className:
                  'motion-button block px-4 py-3 text-sm font-medium text-[#5a0f0f] transition-colors duration-150 hover:bg-[#e8dab8]',
                onClick: () => setIsDropdownOpen(false),
              },
              '📊 My Dashboard',
            ),
            createElement(
              Link,
              {
                to: '/contact',
                className:
                  'motion-button block px-4 py-3 text-sm font-medium text-[#5a0f0f] transition-colors duration-150 hover:bg-[#e8dab8]',
                onClick: () => setIsDropdownOpen(false),
              },
              '✨ Book Consultation',
            ),
            createElement(
              'div',
              {
                className: 'border-t border-[#5a0f0f]/10',
              },
            ),
            createElement(
              'button',
              {
                onClick: handleLogout,
                className:
                  'motion-button block w-full px-4 py-3 text-left text-sm font-medium text-[#5a0f0f] transition-colors duration-150 hover:bg-[#e8dab8]',
                type: 'button',
              },
              '🚪 Logout',
            ),
          ),
      )
    : null

  // Desktop auth section (unauthenticated)
  const desktopAuthSection = user
    ? createElement(
        'div',
        {
          className: 'flex items-center gap-4',
        },
        createElement(
          Link,
          {
            to: '/dashboard',
            className: linkBaseClass,
          },
          'Dashboard',
        ),
        desktopProfileDropdown,
      )
    : createElement(
        'div',
        {
          className: 'flex items-center gap-3',
        },
        createElement(
          Link,
          {
            to: '/login',
            className: linkBaseClass,
          },
          'Login',
        ),
        createElement(
          Link,
          {
            to: '/signup',
            className:
              'motion-button inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/30 border border-white/40',
          },
          'Sign Up',
        ),
        createElement(
          'button',
          {
            onClick: handleBookConsultation,
            className: ctaClass,
            type: 'button',
          },
          'Book a Consultation',
        ),
      )

  // Mobile profile item (authenticated)
  const mobileProfileItem = user
    ? [
        createElement(
          'div',
          {
            key: 'mobile-profile-header',
            className: 'border-t border-white/20 pt-2 mt-2',
          },
        ),
        createElement(
          'button',
          {
            key: 'mobile-profile-btn',
            onClick: () => setIsDropdownOpen(!isDropdownOpen),
            className:
              'motion-button block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white',
            type: 'button',
          },
          `👤 Profile (${user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'})`,
        ),
        isDropdownOpen &&
          createElement(
            'div',
            {
              key: 'mobile-dropdown-menu',
              className: 'mt-1 rounded-lg bg-[#f3e6c9] space-y-1 py-1',
            },
            createElement(
              Link,
              {
                to: '/dashboard',
                className:
                  'motion-button block px-3 py-2 text-sm font-medium text-[#5a0f0f] hover:bg-[#e8dab8] rounded-md',
                onClick: () => {
                  setIsDropdownOpen(false)
                  setIsOpen(false)
                },
              },
              '📊 My Dashboard',
            ),
            createElement(
              Link,
              {
                to: '/contact',
                className:
                  'motion-button block px-3 py-2 text-sm font-medium text-[#5a0f0f] hover:bg-[#e8dab8] rounded-md',
                onClick: () => {
                  setIsDropdownOpen(false)
                  setIsOpen(false)
                },
              },
              '✨ Book Consultation',
            ),
            createElement(
              'button',
              {
                onClick: () => {
                  handleLogout()
                },
                className:
                  'motion-button block w-full text-left px-3 py-2 text-sm font-medium text-[#5a0f0f] hover:bg-[#e8dab8] rounded-md',
                type: 'button',
              },
              '🚪 Logout',
            ),
          ),
      ]
    : [
        createElement(
          'div',
          {
            key: 'mobile-auth-divider',
            className: 'border-t border-white/20 pt-2 mt-2',
          },
        ),
        createElement(
          Link,
          {
            key: 'mobile-login',
            to: '/login',
            className: mobileLinkClass('/login'),
            onClick: () => setIsOpen(false),
          },
          'Login',
        ),
        createElement(
          Link,
          {
            key: 'mobile-signup',
            to: '/signup',
            className: mobileLinkClass('/signup'),
            onClick: () => setIsOpen(false),
          },
          'Sign Up',
        ),
        createElement(
          'button',
          {
            key: 'mobile-contact',
            onClick: () => {
              handleBookConsultation()
              setIsOpen(false)
            },
            className: `${ctaClass} mt-2 justify-center block w-full`,
            type: 'button',
          },
          'Book a Consultation',
        ),
      ]

  // Premium auth modal for unauthenticated users
  const authModal = isAuthModalOpen
    ? createElement(
        'div',
        {
          className:
            'fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm',
          onClick: () => setIsAuthModalOpen(false),
        },
        createElement(
          'div',
          {
            className:
              'relative w-full max-w-md rounded-2xl bg-[#f3e6c9] p-8 shadow-2xl',
            onClick: (e) => e.stopPropagation(),
          },
          // Close button
          createElement(
            'button',
            {
              onClick: () => setIsAuthModalOpen(false),
              className:
                'absolute right-4 top-4 motion-button text-2xl text-[#5a0f0f] hover:text-[#3b1414] transition-colors duration-150',
              type: 'button',
              'aria-label': 'Close modal',
            },
            '✕',
          ),
          // Modal content
          createElement(
            'div',
            {
              className: 'text-center',
            },
            // Icon/Heading
            createElement(
              'div',
              {
                className: 'mb-4 text-5xl',
              },
              '✨',
            ),
            // Title
            createElement(
              'h2',
              {
                className:
                  "mb-3 font-['Playfair_Display'] text-2xl font-bold text-[#5a0f0f]",
              },
              'Premium Consultation',
            ),
            // Message
            createElement(
              'p',
              {
                className: 'mb-6 text-sm text-[#5a0f0f]/80',
              },
              'Please login or create an account before booking your luxury wedding consultation.',
            ),
            // Buttons container
            createElement(
              'div',
              {
                className: 'flex flex-col gap-3',
              },
              createElement(
                'button',
                {
                  onClick: () => {
                    setIsAuthModalOpen(false)
                    navigate('/login')
                  },
                  className:
                    'motion-button rounded-full bg-[#5a0f0f] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#3b1414]',
                  type: 'button',
                },
                'Login',
              ),
              createElement(
                'button',
                {
                  onClick: () => {
                    setIsAuthModalOpen(false)
                    navigate('/signup')
                  },
                  className:
                    'motion-button rounded-full border-2 border-[#5a0f0f] px-6 py-3 font-semibold text-[#5a0f0f] transition-all duration-200 hover:bg-[#5a0f0f]/10',
                  type: 'button',
                },
                'Sign Up',
              ),
            ),
          ),
        ),
      )
    : null

  return createElement(
    'div',
    null,
    createElement(
      'header',
      {
        className: 'sticky top-0 z-50 bg-[#5a0f0f] text-white shadow-md',
      },
      createElement(
        'nav',
        {
          className: "font-['Playfair_Display'] mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8",
        },
        createElement(
          Link,
          {
            to: '/',
            className:
              "inline-flex items-center p-0 font-['Playfair_Display'] text-2xl font-semibold tracking-wide text-white transition duration-200 hover:text-white/90",
          },
          createElement('img', {
            src: logo,
            alt: 'Lil Details',
            className: 'h-[52px] w-auto object-contain',
          }),
        ),
        createElement(
          'div',
          {
            className: 'hidden items-center gap-6 md:flex',
          },
          ...desktopLinks,
          desktopAuthSection,
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
            ...mobileProfileItem,
          ),
        ),
    ),
    authModal,
  )
}

export default Navbar
