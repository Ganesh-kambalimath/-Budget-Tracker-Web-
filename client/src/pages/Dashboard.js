import React, { useContext } from 'react';
    import { AuthContext } from '../context/AuthContext'; 

    function Dashboard() {
      const { user, logout } = useContext(AuthContext);
      const userName = user? user.username : 'Guest';

      return (
        <div className="container page-container">
          <h1 className="page-title">Welcome, {userName}'s MoneyMap!</h1>
          <p className="lead text-center">This is your personalized financial dashboard.</p>

          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Overview</h5>
                  <p className="card-text">Summary of your income, expenses, and savings.</p>
                  {/* Placeholder for charts/graphs in Week 3 */}
                  <div style={{ height: '200px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p className="text-muted">Charts will appear here (Week 3)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quick Actions</h5>
                  <button className="btn btn-primary w-100 mb-2" disabled>Add New Transaction (Week 3)</button>
                  <button className="btn btn-info w-100 mb-2" disabled>View Transactions (Week 3)</button>
                  <button className="btn btn-secondary w-100" onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">More features coming in later phases!</p>
          </div>
        </div>
      );
    }

    export default Dashboard;
