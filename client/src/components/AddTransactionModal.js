import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { categories as categoriesApi } from '../api';

function AddTransactionModal({ show, handleClose, handleAddTransaction }) {
  const = useState('');
  const [amount, setAmount] = useState('');
  const = useState('expense'); 
  const = useState(new Date().toISOString().split('T')); 
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        setCategories(response.data);
        if (response.data.length > 0) {
          setCategory(response.data._id);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  },);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description ||!amount ||!category ||!date) {
      setError('Please fill all required fields.');
      return;
    }
    if (isNaN(parseFloat(amount)) |
        | parseFloat(amount) <= 0) {
setError('Amount must be a positive number.');
return;
}

    handleAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      date,
      category,
      notes,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setType('expense');
    setDate(new Date().toISOString().split('T'));
    setCategory(categories.length > 0? categories._id : '');
    setNotes('');
    handleClose();
  };

  const filteredCategories = categories.filter(cat => cat.type === type);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              {filteredCategories.length > 0? (
                filteredCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))
              ) : (
                <option value="">No categories available. Please add one.</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Add Transaction
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTransactionModal;
