import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const persistUser = (user, provider = 'password', fallbackName = '') => {
    const payload = {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName || fallbackName,
      photoURL: user.photoURL || '',
      provider,
    }

    localStorage.setItem('user', JSON.stringify(payload))
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)

      if (fullName.trim()) {
        await updateProfile(credential.user, { displayName: fullName.trim() })
      }

      persistUser(credential.user, 'password', fullName.trim())
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Unable to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    try {
      const credential = await signInWithPopup(auth, googleProvider)
      persistUser(credential.user, 'google')
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Google sign-up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2a060c] via-[#4b0d16] to-[#9c2b34] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl overflow-hidden rounded-3xl border border-[#f2d3a1]/30 bg-[#26070d]/55 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-md lg:grid-cols-2">
        <section className="relative flex flex-col justify-between bg-gradient-to-br from-[#3d0a12] via-[#651521] to-[#25070c] p-8 text-[#fff7ea] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#f2d3a1]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-[#b68a53]/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#f2d3a1]/35 bg-white/10 px-4 py-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2d3a1] text-sm font-bold text-[#5a0f0f]">
                LD
              </span>
              <span className="font-semibold tracking-[0.12em] text-[#f6e6c8]">Lil Details</span>
            </div>

            <h1 className="mt-8 font-['Playfair_Display'] text-5xl leading-[1.05] text-[#fff9ef] sm:text-6xl">
              Create Your Account
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#f7e7cf]/85 sm:text-base">
              Join an elevated platform crafted for bespoke wedding branding, refined planning, and unforgettable guest experiences.
            </p>
          </div>

          <div className="relative z-10 mt-10 rounded-2xl border border-[#f2d3a1]/25 bg-white/10 p-5 text-sm text-[#f7e7cf]/85 shadow-xl backdrop-blur-sm">
            Elegant design. Seamless execution. Signature moments.
          </div>
        </section>

        <section className="flex items-center justify-center bg-gradient-to-b from-[#fef9f2] to-[#f7ecdf] p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md rounded-3xl border border-[#f2d3a1]/50 bg-white/70 p-6 shadow-[0_20px_60px_rgba(88,23,30,0.2)] backdrop-blur-xl sm:p-8">
            <h2 className="font-['Playfair_Display'] text-4xl text-[#5a0f0f]">Sign Up</h2>
            <p className="mt-2 text-sm text-[#6f2a31]">Create your luxury client account.</p>

            {error ? (
              <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div>
                <label htmlFor="signup-full-name" className="mb-2 block text-sm font-medium text-[#5a0f0f]">
                  Full Name
                </label>
                <input
                  id="signup-full-name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-[#d8b787] bg-white px-4 py-3 text-[#4b1118] outline-none transition focus:border-[#9b6d3b] focus:ring-2 focus:ring-[#d8b787]/40"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-[#5a0f0f]">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-[#d8b787] bg-white px-4 py-3 text-[#4b1118] outline-none transition focus:border-[#9b6d3b] focus:ring-2 focus:ring-[#d8b787]/40"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-[#5a0f0f]">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-[#d8b787] bg-white px-4 py-3 text-[#4b1118] outline-none transition focus:border-[#9b6d3b] focus:ring-2 focus:ring-[#d8b787]/40"
                  placeholder="Create a secure password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#5a0f0f] to-[#8c1f2a] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:from-[#6e1313] hover:to-[#9f2432] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#8c6b45]">
              <span className="h-px flex-1 bg-[#d8b787]/60" />
              Or
              <span className="h-px flex-1 bg-[#d8b787]/60" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8b787] bg-white px-4 py-3 text-sm font-medium text-[#5a0f0f] shadow-sm transition hover:bg-[#fff6ea] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.2 14.6 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c6.9 0 9.1-4.9 9.1-7.4 0-.5-.1-.9-.1-1.3H12z" />
              </svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-[#6f2a31]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#8c1f2a] hover:text-[#5a0f0f]">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Signup
