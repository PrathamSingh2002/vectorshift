import React from 'react';

export const SubmitButton = ({ className = '', children = 'Submit' }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <button
        type="submit"
        className={`
          px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
          shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out
          ${className}
        `}
      >
        {children}
      </button>
    </div>
  );
};