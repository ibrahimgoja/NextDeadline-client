import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
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
      <Button type="submit" className="nd-btn-primary w-100">
        Sign In
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
