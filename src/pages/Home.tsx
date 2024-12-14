import React from 'react';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  return (
    <div>
      <div className="min-h-[91vh] bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
