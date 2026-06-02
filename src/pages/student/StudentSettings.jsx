import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User, Mail, Shield } from 'lucide-react';
import '../../css/Settings.css';

export default function StudentSettings({ user, onNotify }) {
  const [name, setName] = useState(user?.name || '');

  return (
    <div className="page figma-page settings-page">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences</p>
      </div>

      <div className="page-card settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Profile</h2>
          <p className="settings-card-subtitle">Your account information</p>
        </div>
        <div className="settings-card-body">
          <Form.Group className="mb-3">
            <Form.Label className="settings-label">
              <User size={16} className="me-2" />
              Full Name
            </Form.Label>
            <Form.Control
              className="settings-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
            <p className="settings-hint">Name changes are not supported yet.</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="settings-label">
              <Mail size={16} className="me-2" />
              Email
            </Form.Label>
            <Form.Control className="settings-input" value={user?.email} disabled />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="settings-label">
              <Shield size={16} className="me-2" />
              Role
            </Form.Label>
            <div>
              <span className={`role-badge role-badge-${user?.role}`}>{user?.role}</span>
            </div>
          </Form.Group>

          <Button
            className="nd-btn-primary"
            onClick={() => onNotify('Settings saved')}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
