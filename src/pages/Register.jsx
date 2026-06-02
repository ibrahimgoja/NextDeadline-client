import { Card } from 'react-bootstrap';
import { GraduationCap } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';
import '../css/Auth.css';

export default function Register({ onLogin }) {
  return (
    <div className="auth-page auth-page-register">
      <Card className="auth-card">
        <div className="auth-card-header">
          <div className="auth-logo auth-logo-sm">
            <GraduationCap />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the assignment tracker platform</p>
        </div>
        <Card.Body className="auth-body">
          <RegisterForm onLogin={onLogin} />
        </Card.Body>
      </Card>
    </div>
  );
}
