import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-gray-50 z-50' 
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div 
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" 
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <p className="mt-4 text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
