import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';
import RoleSelector from './RoleSelector';

export default function RegisterForm({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'An account with this email already exists');
        return;
      }
      onLogin(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
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
        <Form.Label>Full Name</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.edu" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </Form.Group>
      <RoleSelector role={role} setRole={setRole} />
      <Button type="submit" className="nd-btn-primary w-100" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
      <p className="text-center text-muted mb-0" style={{ fontSize: 14 }}>
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Sign In
        </Link>
      </p>
    </Form>
  );
}
