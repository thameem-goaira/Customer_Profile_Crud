import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
const CustomerForm = lazy(() => import('./pages/CustomerForm'));
const CustomerList = lazy(() => import('./pages/CustomerList'));
const CustomerView = lazy(() => import('./pages/CustomerView'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route path="/customer/list" element={<CustomerList />} />
        <Route path="/customer/:customerId/edit" element={<CustomerForm />} />
        <Route path="/customer/:customerId/view" element={<CustomerView />} />
      </Routes>
    </Suspense>
  );
};

export default App;
