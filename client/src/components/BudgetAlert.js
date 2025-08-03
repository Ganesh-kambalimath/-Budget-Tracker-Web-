import React from 'react';
import { Alert } from 'react-bootstrap';

function BudgetAlert({ category, percentageUsed }) {
  if (percentageUsed >= 80) {
    return (
      <Alert variant={percentageUsed >= 100? "danger" : "warning"} className="mt-2">
        <strong>Warning!</strong> You've used {percentageUsed.toFixed(2)}% of your {category} budget.
        {percentageUsed >= 100 && " You have exceeded your budget!"}
      </Alert>
    );
  }
  return null;
}

export default BudgetAlert;
