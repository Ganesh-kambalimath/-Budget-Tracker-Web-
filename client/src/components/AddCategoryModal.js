import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function AddCategoryModal({ show, handleClose, handleAddCategory }) {
  const [name, setName] = useState('');
  const = useState('expense');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name) {
      setError('Category name is required.');
      return;
    }
    handleAddCategory({ name, type });
    setName('');
    setType('expense');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Category
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCategoryModal;
