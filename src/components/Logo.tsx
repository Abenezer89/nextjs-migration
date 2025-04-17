import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-job-primary rounded-md flex items-center justify-center mr-2">
        <span className="text-white font-bold text-xl">E</span>
      </div>
      <span className="text-xl font-semibold text-job-text">Eshi Jobs</span>
    </div>
  );
};

export default Logo;
