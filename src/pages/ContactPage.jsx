import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  names: '',
  email: '',
  weddingDate: '',
  cityVenue: '',
  phone: '',
  source: '',
  message: '',
}

function ContactPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const userValue = localStorage.getItem('user')

    if (!userValue) {
      setLoggedInUser(null)
      return
    }

    try {
      setLoggedInUser(JSON.parse(userValue))
    } catch {
      setLoggedInUser(null)
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!loggedInUser) {
      alert('Please login before submitting your consultation.')
      navigate('/login')
      return
    }

    const payload = {
      userId: loggedInUser.uid,
      userEmail: loggedInUser.email,
      userFullName: loggedInUser.fullName,
      names: formData.names,
      email: formData.email,
      weddingDate: formData.weddingDate,
      cityVenue: formData.cityVenue,
      phone: formData.phone,
      source: formData.source,
      message: formData.message,
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      alert('Form submitted successfully')
      setFormData(initialFormData)
      navigate('/dashboard')
    } catch (error) {
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <main>
      <section className="bg-[#5a0f0f] px-6 py-28 text-center text-white sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-['Playfair_Display'] text-5xl font-bold leading-tight tracking-[-0.02em] sm:text-6xl">
            Let&apos;s Talk About Your Wedding
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
            No pressure, no pitch. Just a 30-minute conversation to understand
            your story.
          </p>
        </div>
      </section>

      <section className="bg-[#f3e6c9] px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="rounded-xl border border-[#5a0f0f]/15 bg-white/80 p-5 shadow-md backdrop-blur-sm">
            <p className="text-sm font-medium text-[#5a0f0f]">
              Logged in as:{' '}
              {loggedInUser?.fullName || 'Guest'}
              {' '}
              ({loggedInUser?.email || 'Not logged in'})
            </p>
          </div>

          <div className="rounded-xl border border-[#5a0f0f]/10 bg-white p-10 shadow-lg">
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-[#5a0f0f] sm:text-5xl">
              Tell Us About You
            </h2>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                    Your Names
                  </span>
                  <input
                    type="text"
                    name="names"
                    value={formData.names}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your names"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                  Wedding Date
                </span>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                  City / Venue
                </span>
                <input
                  type="text"
                  name="cityVenue"
                  value={formData.cityVenue}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="City or venue"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Phone number"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                  How did you hear about us?
                </span>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Referral">Referral</option>
                  <option value="Wedding Planner">Wedding Planner</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5a0f0f]/80">
                  Message
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Share a few details about your wedding and design goals"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700"
              >
                Submit &amp; Book Your Call
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-[#5a0f0f]/10 bg-white p-10 shadow-lg">
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-[#5a0f0f] sm:text-5xl">
              Or Book Directly
            </h2>
            <p className="mt-4 text-base text-[#5a0f0f]/75">
              Choose a time that works for you
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <iframe
                title="Calendly Booking"
                src="https://calendly.com/your-link"
                width="100%"
                height="500"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
