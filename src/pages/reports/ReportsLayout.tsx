import React from "react";
import { Outlet } from "react-router-dom";

const ReportsLayout: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports Section</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportsLayout;
