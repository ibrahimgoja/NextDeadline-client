import { Card } from 'react-bootstrap';
import { GraduationCap } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import '../css/Auth.css';

export default function Login() {
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-card-header">
          <div className="auth-logo">
            <GraduationCap />
          </div>
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to your account to continue learning</p>
        </div>
        <Card.Body className="auth-body">
          <LoginForm />
        </Card.Body>
      </Card>
    </div>
  );
}
