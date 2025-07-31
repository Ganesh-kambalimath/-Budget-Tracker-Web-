
    import React from 'react';

    function Home() {
      return (
        <div className="container page-container">
          <h1 className="page-title">Welcome to MoneyMap!</h1>
          <p className="lead text-center">Your personal budget and expense tracker.</p>
          <div className="text-center mt-4">
            <p>Manage your finances with ease. Track income, expenses, and gain insights into your spending habits.</p>
            <p>Ready to take control of your money? <a href="/register">Sign Up</a> or <a href="/login">Log In</a> to get started!</p>
          </div>
        </div>
      );
    }

    export default Home;
   
