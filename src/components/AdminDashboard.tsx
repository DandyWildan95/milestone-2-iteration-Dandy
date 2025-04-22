import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DataType {
  // Define your data structure
}

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios.get<DataType[]>('/your-api-endpoint')
      .then(response => {
        // Use type assertion or guard
        setData(response.data as DataType[]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {/* Render your data here */}
    </div>
  );
};

export default AdminDashboard;

