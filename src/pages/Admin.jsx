import React, { useEffect, useState } from 'react'

function Admin() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [edits, setEdits] = useState({})
  const [loadingMap, setLoadingMap] = useState({})

  const STATUS_OPTIONS = ['New Inquiry', 'Contacted', 'Demo Sent', 'Confirmed']

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/admin'
        return
      }

      const res = await fetch('http://localhost:5000/api/contact', {
        headers: { Authorization: token },
      })
      const responseData = await res.json()
      setData(responseData)

      // initialize edit state for each item
      const initial = {}
      (responseData || []).forEach((item) => {
        initial[item._id] = {
          status: item.status || 'New Inquiry',
          demoLink: item.demoLink || '',
          adminMessage: item.adminMessage || '',
        }
      })
      setEdits(initial)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const query = search.trim().toLowerCase()

  const visibleData = [...data]
    .sort((a, b) => {
      const first = new Date(a.createdAt || 0).getTime()
      const second = new Date(b.createdAt || 0).getTime()
      return second - first
    })
    .filter((item) => {
      if (!query) return true

      return [item.names, item.email, item.cityVenue].some((value) =>
        String(value || '').toLowerCase().includes(query),
      )
    })

  const buildWhatsAppLink = (item) => {
    const cleanPhone = String(item.phone || '').replace(/\D/g, '')
    const text = encodeURIComponent(
      `Hi ${item.names || 'there'}, thanks for your enquiry. Please check this demo link: ${item.demoLink || 'https://example.com/demo'}`,
    )

    return `https://wa.me/${cleanPhone}?text=${text}`
  }

  const buildEmailLink = (item) => {
    const subject = encodeURIComponent('Regarding your wedding enquiry')
    const body = encodeURIComponent(
      `Hi ${item.names || 'there'},\n\nThanks for reaching out. Here is a demo link for next steps: ${item.demoLink || 'https://example.com/demo'}\n\nBest regards,\nLil Details`,
    )

    return `mailto:${item.email || ''}?subject=${subject}&body=${body}`
  }

  const latestSubmission = visibleData[0]?.createdAt
    ? new Date(visibleData[0].createdAt).toLocaleDateString()
    : '—'

  const handleEditChange = (id, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }))
  }

  const setRowLoading = (id, v) => setLoadingMap((p) => ({ ...p, [id]: v }))

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Admin token missing. Please login again.')
        window.location.href = '/admin'
        return
      }

      const payload = edits[id] || {}
      setRowLoading(id, true)

      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          status: payload.status,
          demoLink: payload.demoLink,
          adminMessage: payload.adminMessage,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to update')
      }

      // refresh data after successful update
      await fetchData()
      alert('Client updated successfully')
    } catch (err) {
      console.error(err)
      alert('Update failed: ' + (err.message || 'unknown error'))
    } finally {
      setRowLoading(id, false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 24px 60px',
        background:
          'linear-gradient(180deg, #f7f1eb 0%, #f3e9df 35%, #efe5d7 100%)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '28px',
            padding: '28px 28px 24px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(123,30,30,0.08)',
            boxShadow: '0 20px 50px rgba(90,15,15,0.08)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontSize: '12px',
                  color: '#7b1e1e',
                  fontWeight: 700,
                }}
              >
                Lil Details
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: '40px',
                  lineHeight: 1.05,
                  fontFamily: 'Playfair Display, serif',
                  color: '#3b1414',
                }}
              >
                Admin Dashboard
              </h1>
              <p style={{ margin: '10px 0 0', color: '#6f5d56', fontSize: '15px' }}>
                A refined view of contact submissions and client enquiries.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '12px',
                minWidth: '320px',
              }}
            >
              {[
                { label: 'Total Submissions', value: data.length },
                { label: 'Visible Results', value: visibleData.length },
                { label: 'Latest Entry', value: latestSubmission },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '18px',
                    background: '#fff',
                    border: '1px solid rgba(123,30,30,0.08)',
                    boxShadow: '0 8px 24px rgba(90,15,15,0.05)',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#8a7a73', marginBottom: '6px' }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#3b1414',
                      fontFamily: 'Playfair Display, serif',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 360px' }}>
            <input
              type="text"
              placeholder="Search by name, email, or city"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: '100%',
                maxWidth: '520px',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid rgba(123,30,30,0.14)',
                background: 'rgba(255,255,255,0.85)',
                boxShadow: '0 10px 24px rgba(90,15,15,0.05)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#7f6a61',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.6)',
              borderRadius: '999px',
              border: '1px solid rgba(123,30,30,0.08)',
            }}
          >
            Sorted newest first
          </div>
        </div>

      {data.length === 0 ? (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.75)',
              borderRadius: '20px',
              border: '1px solid rgba(123,30,30,0.08)',
              boxShadow: '0 12px 30px rgba(90,15,15,0.05)',
              color: '#6f5d56',
            }}
          >
            No submissions yet
          </div>
      ) : visibleData.length === 0 ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.75)',
            borderRadius: '20px',
            border: '1px solid rgba(123,30,30,0.08)',
            boxShadow: '0 12px 30px rgba(90,15,15,0.05)',
            color: '#6f5d56',
          }}
        >
          No results found
        </div>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            borderRadius: '22px',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(123,30,30,0.08)',
            boxShadow: '0 20px 40px rgba(90,15,15,0.08)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              background: 'transparent',
              overflow: 'hidden',
            }}
          >
            <thead style={{ background: '#7b1e1e', color: '#fff' }}>
              <tr>
                <th style={th}>Names</th>
                <th style={th}>Email</th>
                <th style={th}>Date</th>
                <th style={th}>City</th>
                <th style={th}>Phone</th>
                <th style={th}>Source</th>
                <th style={th}>Message</th>
                <th style={th}>Admin Controls</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.map((item, index) => {
                const id = item._id || index
                const edit = edits[id] || { status: 'New Inquiry', demoLink: '', adminMessage: '' }
                const rowLoading = !!loadingMap[id]

                return (
                  <tr
                    key={id}
                    style={{
                      borderBottom: '1px solid rgba(123,30,30,0.08)',
                      background: index % 2 === 0 ? '#fff' : '#fcf9f7',
                    }}
                  >
                    <td style={td}>{item.names}</td>
                    <td style={td}>{item.email}</td>
                    <td style={td}>{item.weddingDate}</td>
                    <td style={td}>{item.cityVenue}</td>
                    <td style={td}>{item.phone}</td>
                    <td style={td}>{item.source}</td>
                    <td style={td}>{item.message}</td>

                    <td style={{ ...td, minWidth: 320 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <select
                          value={edit.status}
                          onChange={(e) => handleEditChange(id, 'status', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: 8 }}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          placeholder="Demo link (optional)"
                          value={edit.demoLink}
                          onChange={(e) => handleEditChange(id, 'demoLink', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: 8 }}
                        />

                        <textarea
                          placeholder="Admin message"
                          value={edit.adminMessage}
                          onChange={(e) => handleEditChange(id, 'adminMessage', e.target.value)}
                          rows={3}
                          style={{ padding: '8px 10px', borderRadius: 8 }}
                        />
                      </div>
                    </td>

                    <td style={{ ...td, minWidth: 200 }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleSave(id)}
                          disabled={rowLoading}
                          style={{
                            background: 'linear-gradient(180deg, #8b2323, #6f1818)',
                            color: '#fff',
                            padding: '9px 12px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: 700,
                            boxShadow: '0 10px 18px rgba(123,30,30,0.18)',
                            border: 'none',
                            cursor: rowLoading ? 'not-allowed' : 'pointer',
                            opacity: rowLoading ? 0.7 : 1,
                          }}
                        >
                          {rowLoading ? 'Saving...' : 'Save Update'}
                        </button>

                        <a
                          href={buildWhatsAppLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={buttonLink}
                        >
                          Send WhatsApp
                        </a>
                        <a href={buildEmailLink(item)} style={buttonLink}>
                          Send Email
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  )
}

const th = {
  padding: '16px 14px',
  textAlign: 'left',
  fontSize: '13px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const td = {
  padding: '16px 14px',
  fontSize: '14px',
  color: '#2f2b29',
  verticalAlign: 'top',
}

const buttonLink = {
  background: 'linear-gradient(180deg, #8b2323, #6f1818)',
  color: '#fff',
  textDecoration: 'none',
  padding: '9px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
  boxShadow: '0 10px 18px rgba(123,30,30,0.18)',
}

export default Admin