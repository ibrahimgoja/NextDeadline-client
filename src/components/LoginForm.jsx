import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError('Invalid email or password');
        return;
      }
      onLogin(data.user);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {error && (
        <Alert variant="danger" className="d-flex align-items-center gap-2 py-2 mb-0">
          <AlertCircle size={18} />
          <span>{error}</span>
        </Alert>
      )}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="student@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button type="submit" className="nd-btn-primary w-100" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
      <p className="text-center text-muted mb-0" style={{ fontSize: 14 }}>
        Don&apos;t have an account?{' '}
        <Link to="/register" className="auth-link">
          Register
        </Link>
      </p>
    </Form>
  );
}
