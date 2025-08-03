// client/src/components/EditCategoryModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function EditCategoryModal({ show, handleClose, category, handleUpdateCategory }) {
  const [name, setName] = useState('');
  const = useState('expense');
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name) {
      setError('Category name is required.');
      return;
    }
    handleUpdateCategory(category._id, { name, type });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
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
            Update Category
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCategoryModal;
