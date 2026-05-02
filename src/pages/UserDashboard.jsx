import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function UserDashboard() {
  const navigate = useNavigate()
  const [consultation, setConsultation] = useState(null)
  const [loading, setLoading] = useState(true)

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user')
      if (!raw) {
        return { uid: '', fullName: 'Guest User', email: 'Not available' }
      }

      const parsed = JSON.parse(raw)
      return {
        uid: parsed.uid || '',
        fullName: parsed.fullName || 'Valued Client',
        email: parsed.email || 'Not available',
      }
    } catch {
      return { uid: '', fullName: 'Valued Client', email: 'Not available' }
    }
  }, [])

  useEffect(() => {
    const fetchConsultation = async () => {
      if (!user.uid) {
        setLoading(false)
        setConsultation(null)
        return
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/contact/user/${encodeURIComponent(user.uid)}`,
        )

        if (response.status === 404) {
          setConsultation(null)
          return
        }

        if (!response.ok) {
          throw new Error('Unable to fetch consultation')
        }

        const data = await response.json()
        setConsultation(data)
      } catch {
        setConsultation(null)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultation()
  }, [user.uid])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleGoToContact = () => {
    navigate('/contact')
  }

  const submittedDetails = [
    { label: 'Your Names', value: consultation?.names },
    { label: 'Wedding Date', value: consultation?.weddingDate },
    { label: 'City / Venue', value: consultation?.cityVenue },
    { label: 'Phone Number', value: consultation?.phone },
    { label: 'How You Found Us', value: consultation?.source },
    { label: 'Message', value: consultation?.message },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2a060c] via-[#4b0d16] to-[#9c2b34] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-8 rounded-3xl border border-[#f2d3a1]/30 bg-[#26070d]/50 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8 lg:p-10">
        <section className="relative overflow-hidden rounded-3xl border border-[#f2d3a1]/40 bg-gradient-to-br from-[#3f0b13] via-[#5f1620] to-[#2a070d] p-7 text-[#fff8ec] shadow-2xl sm:p-9">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#f2d3a1]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#d9b278]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#f8e4c3]">Lil Details Concierge</p>
              <h1 className="mt-3 font-['Playfair_Display'] text-4xl leading-tight sm:text-5xl">
                Welcome, {user.fullName}
              </h1>
              <p className="mt-3 text-sm text-[#f8e4c3]/90 sm:text-base">{user.email}</p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#f8e4c3]/88 sm:text-base">
                Your luxury wedding branding journey is now active. This dashboard will keep your timelines, references, and design progress in one refined space.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-xl border border-[#f2d3a1]/45 bg-white/10 px-5 py-3 text-sm font-semibold text-[#fff4e2] transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </section>

        {loading ? (
          <section className="rounded-3xl border border-[#f2d3a1]/45 bg-[#fff8ee] p-8 shadow-[0_20px_50px_rgba(88,23,30,0.2)]">
            <p className="text-center text-sm font-medium tracking-wide text-[#6f2a31] sm:text-base">
              Loading your consultation details...
            </p>
          </section>
        ) : null}

        {!loading && !consultation ? (
          <section className="rounded-3xl border border-[#f2d3a1]/45 bg-[#fff8ee] p-8 shadow-[0_20px_50px_rgba(88,23,30,0.2)]">
            <h2 className="font-['Playfair_Display'] text-3xl text-[#5a0f0f] sm:text-4xl">
              No consultation submitted yet
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6f2a31] sm:text-base">
              Start your wedding branding journey by sharing your consultation details. Our team will review your request and respond with premium recommendations.
            </p>
            <button
              type="button"
              onClick={handleGoToContact}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#5a0f0f] to-[#8c1f2a] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:from-[#6e1313] hover:to-[#9f2432]"
            >
              Submit Consultation
            </button>
          </section>
        ) : null}

        {!loading && consultation ? (
          <section className="rounded-3xl border border-[#f2d3a1]/45 bg-[#fff8ee] p-6 shadow-[0_20px_50px_rgba(88,23,30,0.2)] sm:p-8">
          <h2 className="font-['Playfair_Display'] text-3xl text-[#5a0f0f] sm:text-4xl">My Wedding Requirements</h2>
          <p className="mt-2 text-sm text-[#6f2a31] sm:text-base">
            Your current project status and updates from our design team.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-[#dcb988] bg-white p-5 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8e6b45]">Current Status</p>
              <h3 className="mt-3 font-['Playfair_Display'] text-2xl text-[#5a0f0f]">{consultation.status}</h3>
              <p className="mt-2 text-sm text-[#6f2a31]">We have received your profile and requirements.</p>
            </article>

            <article className="rounded-2xl border border-[#dcb988] bg-white p-5 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8e6b45]">Demo Design</p>
              {consultation.demoLink === 'Pending From Admin' ? (
                <h3 className="mt-3 font-['Playfair_Display'] text-2xl text-[#5a0f0f]">
                  {consultation.demoLink}
                </h3>
              ) : consultation.demoLink ? (
                <button
                  type="button"
                  onClick={() => window.open(consultation.demoLink, '_blank')}
                  className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#5a0f0f] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#6e1313]"
                >
                  View Demo Design
                </button>
              ) : null}
              <p className="mt-2 text-sm text-[#6f2a31]">A curated concept board will be shared soon.</p>
            </article>

            <article className="rounded-2xl border border-[#dcb988] bg-white p-5 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8e6b45]">Admin Message</p>
              <h3 className="mt-3 font-['Playfair_Display'] text-2xl text-[#5a0f0f]">{consultation.adminMessage}</h3>
              <p className="mt-2 text-sm text-[#6f2a31]">Our team will connect with further updates.</p>
            </article>
          </div>
          </section>
        ) : null}

        {!loading && consultation ? (
          <section className="rounded-3xl border border-[#f2d3a1]/45 bg-[#fff8ee] p-6 shadow-[0_20px_50px_rgba(88,23,30,0.2)] sm:p-8">
            <h2 className="font-['Playfair_Display'] text-3xl text-[#5a0f0f] sm:text-4xl">
              Submitted Wedding Details
            </h2>
            <p className="mt-2 text-sm text-[#6f2a31] sm:text-base">
              A summary of the details you shared with our team.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {submittedDetails.map((item) => (
                <article key={item.label} className="rounded-2xl border border-[#dcb988] bg-white p-5 shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8e6b45]">{item.label}</p>
                  <p className="mt-3 text-base leading-relaxed text-[#5a0f0f]">
                    {item.value || 'Not provided'}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export default UserDashboard
