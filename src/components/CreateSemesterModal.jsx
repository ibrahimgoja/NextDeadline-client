import { Button, Modal, Form } from 'react-bootstrap';

const SEASONS = ['Fall', 'Spring', 'Summer', 'Winter'];

export default function CreateSemesterModal({ show, onHide, season, setSeason, year, setYear, name, setName, onSubmit }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Semester</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Season</Form.Label>
            <Form.Select value={season} onChange={(e) => setSeason(e.target.value)}>
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} min={2020} max={2030} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Custom Name (optional)</Form.Label>
            <Form.Control placeholder={`${season} ${year}`} value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="nd-btn-primary w-100">
            Create Semester
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
