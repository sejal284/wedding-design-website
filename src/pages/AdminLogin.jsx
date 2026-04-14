import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('token', data.token)
        navigate('/admin/dashboard', { replace: true })
        return
      }

      alert(data.message || 'Invalid login')
    } catch (error) {
      console.error(error)
      alert('Unable to reach server. Please start backend on port 5000.')
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f5f2',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '10px',
          width: '300px',
        }}
      >
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={btn}>
          Login
        </button>
      </div>
    </div>
  )
}

const input = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
}

const btn = {
  width: '100%',
  padding: '10px',
  background: '#7b1e1e',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
}

export default AdminLogin
