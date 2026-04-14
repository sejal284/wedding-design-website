import { createElement, Fragment } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import ServicesPage from './pages/ServicesPage'
import ProcessPage from './pages/ProcessPage'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

function RequireAdminAuth({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) {
    return createElement(Navigate, {
      to: '/admin',
      replace: true,
      state: { from: location },
    })
  }

  return children
}

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return createElement(
    Fragment,
    null,
    !isAdminRoute && createElement(Navbar),
    createElement(
      Routes,
      null,
      createElement(Route, { path: '/', element: createElement(Home) }),
      createElement(Route, { path: '/work', element: createElement(Work) }),
      createElement(Route, {
        path: '/services',
        element: createElement(ServicesPage),
      }),
      createElement(Route, {
        path: '/process',
        element: createElement(ProcessPage),
      }),
      createElement(Route, { path: '/about', element: createElement(About) }),
      createElement(Route, {
        path: '/contact',
        element: createElement(ContactPage),
      }),
      createElement(Route, {
        path: '/admin',
        element: createElement(AdminLogin),
      }),
      createElement(Route, {
        path: '/admin/dashboard',
        element: createElement(
          RequireAdminAuth,
          null,
          createElement(Admin),
        ),
      }),
    ),
    !isAdminRoute && createElement(Footer),
  )
}

function App() {
  return createElement(BrowserRouter, null, createElement(AppContent))
}

export default App
