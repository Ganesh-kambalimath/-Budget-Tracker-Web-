import React from 'react';
    import { Link } from 'react-router-dom';

    function NotFound() {
      return (
        <div className="container page-container text-center">
          <h1 className="page-title display-1">404</h1>
          <h2>Page Not Found</h2>
          <p className="lead">Oops! The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary mt-3">Go to Home Page</Link>
        </div>
      );
    }

    export default NotFound;
