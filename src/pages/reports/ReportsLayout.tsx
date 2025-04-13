import React from 'react';
import { Outlet } from 'react-router-dom';

const ReportsLayout: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <Outlet />
    </div>
  );
};

export default ReportsLayout;
