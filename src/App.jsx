import { Fragment, createElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import About from './pages/About.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'

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

function RequireUserAuth({ children }) {
  const location = useLocation()
  const user = localStorage.getItem('user')

  if (!user) {
    return createElement(Navigate, {
      to: '/login',
      replace: true,
      state: { from: location },
    })
  }

  return children
}

function AppContent() {
  const location = useLocation()
  const hideLayoutRoutes = [
    '/admin',
    '/admin/dashboard',
    '/login',
    '/signup',
  ]
  const hideLayout = hideLayoutRoutes.includes(location.pathname)

  return createElement(
    Fragment,
    null,
    !hideLayout && createElement(Navbar),
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
      createElement(Route, {
        path: '/login',
        element: createElement(Login),
      }),
      createElement(Route, {
        path: '/signup',
        element: createElement(Signup),
      }),
      createElement(Route, {
        path: '/dashboard',
        element: createElement(
          RequireUserAuth,
          null,
          createElement(UserDashboard),
        ),
      }),
    ),
    !hideLayout && createElement(Footer),
  )
}

function App() {
  return createElement(BrowserRouter, null, createElement(AppContent))
}

export default App
