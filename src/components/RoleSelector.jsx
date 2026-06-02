import { Form } from 'react-bootstrap';
import { User, UserCog } from 'lucide-react';

export default function RoleSelector({ role, setRole }) {
  return (
    <div>
      <Form.Label className="mb-2">I am a:</Form.Label>
      <div className={`role-option${role === 'student' ? ' selected' : ''}`} onClick={() => setRole('student')}>
        <Form.Check type="radio" name="role" checked={role === 'student'} onChange={() => setRole('student')} />
        <User size={18} className="text-primary" />
        <div>
          <div className="role-option-title">Student</div>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Track and manage my assignments
          </div>
        </div>
      </div>
      <div className={`role-option${role === 'instructor' ? ' selected' : ''}`} onClick={() => setRole('instructor')}>
        <Form.Check type="radio" name="role" checked={role === 'instructor'} onChange={() => setRole('instructor')} />
        <UserCog size={18} className="text-primary" />
        <div>
          <div className="role-option-title">Instructor</div>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Create courses and assignments
          </div>
        </div>
      </div>
    </div>
  );
}
